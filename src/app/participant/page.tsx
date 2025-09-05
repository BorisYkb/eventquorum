//src/app/participant/page.tsx
import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewParticipantView } from 'src/sections/overview/participant/view/overview-participant-view';

// ----------------------------------------------------------------------

/**
 * Métadonnées pour la page d'accueil de l'espace participant
 * Définit le titre de l'onglet du navigateur
 */
export const metadata: Metadata = { 
  title: `Accueil participant - ${CONFIG.appName}` 
};

/**
 * Page d'accueil principale de l'espace Participant
 * Affiche le dashboard avec les informations et statistiques du participant
 * 
 * @returns Vue d'overview spécifique au participant
 */
export default function Page() {
  return <OverviewParticipantView />;
}