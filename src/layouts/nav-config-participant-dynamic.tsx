//src/layouts/nav-config-participant-dynamic.ts
import { useMemo } from 'react';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { Label } from 'src/components/label';

import { useParticipantStatus } from 'src/contexts/participant-context';

import { ICONS } from './nav-config-participant';

import type { NavSectionProps } from 'src/components/nav-section';

// ----------------------------------------------------------------------

/**
 * Hook pour générer la navigation dynamique basée sur le statut du participant ET l'URL actuelle
 * La navigation s'adapte selon l'étape du parcours participant et la section dans laquelle il se trouve
 */
export const useParticipantNavData = (): NavSectionProps['data'] => {
  const { status } = useParticipantStatus();
  const pathname = usePathname();

  return useMemo(() => {
    // Détection de la section actuelle basée sur l'URL
    const isInInitialSection = pathname === '/participant' || pathname === '/participant/';
    const isInEnligneSection = pathname.includes('/participant/enligne');
    const isInEnpresentielSection = pathname.includes('/participant/enpresentiel');
    
    // Élément de base toujours présent
    const baseItems = [
      { 
        title: 'Accueil', 
        path: isInInitialSection 
          ? paths.participant.root 
          : isInEnligneSection 
            ? `${paths.participant.root}/enligne`
            : `${paths.participant.root}/enpresentiel`,
        icon: ICONS.home,
      },
    ];

    // Éléments conditionnels basés sur le statut ET la section
    const conditionalItems = [];

    // Onglet "Activités" - Disponible uniquement dans les sous-sections après confirmation
    if ((isInEnligneSection || isInEnpresentielSection) && status.hasConfirmedPresence) {
      const activitesPath = isInEnligneSection
        ? paths.participant.enligne.activites
        : paths.participant.enpresentiel.activites;
        
      conditionalItems.push({
        title: 'Activités', 
        path: activitesPath,
        icon: ICONS.activities,
      });
    }

    // Onglet "Mes Interactions" - Disponible selon le type de participation et paiement
    const shouldShowInteractions = () => {
      if (!status.hasPaidActivities) return false;

      // Pour participation en présentiel : disponible après paiement
      if (isInEnpresentielSection) {
        return true;
      }

      // Pour participation en ligne : disponible après confirmation "suivre en direct"
      if (isInEnligneSection) {
        return status.hasConfirmedLiveFollow;
      }

      return false;
    };

    if (shouldShowInteractions()) {
      const interactionsPath = isInEnligneSection 
        ? `${paths.participant.root}/enligne/mesinteractions`
        : `${paths.participant.root}/enpresentiel/mesinteractions`;
        
      conditionalItems.push({
        title: 'Mes Interactions', 
        path: interactionsPath,
        icon: ICONS.interactions,
      });
    }

    return [
      {
        // subheader: 'Navigation', // Optionnel
        items: [...baseItems, ...conditionalItems],
      },
    ];
  }, [
    pathname,
    status.hasConfirmedPresence,
    status.participationType, 
    status.hasPaidActivities,
    status.hasConfirmedLiveFollow
  ]);
};