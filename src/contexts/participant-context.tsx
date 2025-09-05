//src/contexts/participant-context.tsx - VERSION CORRIGÉE
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// ----------------------------------------------------------------------

/**
 * Type définissant le statut actuel du participant
 */
type ParticipantStatus = {
    /** Indique si le participant a confirmé sa présence */
    hasConfirmedPresence: boolean;
    /** Type de participation choisi par le participant */
    participationType: 'enligne' | 'enpresentiel' | null;
    /** Section actuelle dans laquelle se trouve le participant */
    currentSection: 'initial' | 'enligne' | 'enpresentiel';
    /** Indique si le participant a payé pour les activités */
    hasPaidActivities: boolean;
    /** Indique si le participant a confirmé suivre en direct (uniquement pour participation en ligne) */
    hasConfirmedLiveFollow: boolean;
    /** Étape actuelle du parcours participant */
    currentStep: 'initial' | 'confirmed' | 'paid' | 'live_ready';
};

/**
 * Interface du contexte participant
 */
interface ParticipantContextType {
    /** Statut actuel du participant */
    status: ParticipantStatus;
    /** Fonction pour mettre à jour le statut */
    updateStatus: (updates: Partial<ParticipantStatus>) => void;
    /** Fonction pour réinitialiser le statut */
    resetStatus: () => void;
}

// Création du contexte
const ParticipantContext = createContext<ParticipantContextType | null>(null);

// Statut initial par défaut
const initialStatus: ParticipantStatus = {
    hasConfirmedPresence: false,
    participationType: null,
    currentSection: 'initial',
    hasPaidActivities: false,
    hasConfirmedLiveFollow: false,
    currentStep: 'initial'
};

// Clé pour le localStorage
const STORAGE_KEY = 'eventquorum-participant-status';

// ----------------------------------------------------------------------

/**
 * Provider du contexte participant
 * Gère l'état global du participant et sa persistance
 */
export function ParticipantProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<ParticipantStatus>(initialStatus);
    const [isInitialized, setIsInitialized] = useState(false);

    /**
     * Chargement des données depuis le localStorage au montage
     */
    useEffect(() => {
        try {
            const savedStatus = localStorage.getItem(STORAGE_KEY);
            if (savedStatus) {
                const parsedStatus = JSON.parse(savedStatus);
                setStatus(parsedStatus);
            }
        } catch (error) {
            console.warn('Erreur lors du chargement du statut participant:', error);
            // En cas d'erreur, on garde le statut initial
        } finally {
            setIsInitialized(true);
        }
    }, []);

    /**
     * Mise à jour du statut participant avec persistance
     * @param updates - Mises à jour partielles du statut
     */
    const updateStatus = (updates: Partial<ParticipantStatus>) => {
        setStatus(currentStatus => {
            const newStatus = { ...currentStatus, ...updates };

            // Mise à jour automatique de currentSection basée sur participationType
            if (updates.participationType) {
                newStatus.currentSection = updates.participationType;
            }

            // ✅ Validation des états cohérents
            if (updates.hasConfirmedLiveFollow && newStatus.participationType !== 'enligne') {
                console.warn('hasConfirmedLiveFollow ne peut être true que pour participationType enligne');
                return currentStatus; // Pas de changement si incohérent
            }

            // Logique automatique pour currentStep basée sur les autres propriétés
            if (newStatus.hasConfirmedLiveFollow) {
                newStatus.currentStep = 'live_ready';
            } else if (newStatus.hasPaidActivities) {
                newStatus.currentStep = 'paid';
            } else if (newStatus.hasConfirmedPresence) {
                newStatus.currentStep = 'confirmed';
            } else {
                newStatus.currentStep = 'initial';
            }

            // Sauvegarde dans localStorage
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newStatus));
            } catch (error) {
                console.warn('Erreur lors de la sauvegarde du statut participant:', error);
            }

            return newStatus;
        });
    };

    /**
     * Réinitialisation complète du statut participant
     */
    const resetStatus = () => {
        setStatus(initialStatus);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.warn('Erreur lors de la suppression du statut participant:', error);
        }
    };

    // Ne pas rendre le contexte tant que l'initialisation n'est pas terminée
    if (!isInitialized) {
        return null; // ou un loading spinner
    }

    return (
        <ParticipantContext.Provider
            value={{
                status,
                updateStatus,
                resetStatus
            }}
        >
            {children}
        </ParticipantContext.Provider>
    );
}

/**
 * Hook pour accéder au contexte participant
 * @returns Contexte participant avec statut et fonctions de mise à jour
 * @throws Error si utilisé en dehors du ParticipantProvider
 */
export const useParticipantStatus = (): ParticipantContextType => {
    const context = useContext(ParticipantContext);

    if (!context) {
        throw new Error(
            'useParticipantStatus doit être utilisé à l\'intérieur d\'un ParticipantProvider'
        );
    }

    return context;
};