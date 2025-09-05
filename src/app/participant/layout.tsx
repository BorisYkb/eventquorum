//src/app/participant/layout.tsx
import { CONFIG } from 'src/global-config';

import { AuthGuard } from 'src/auth/guard';
import { ParticipantProvider } from 'src/contexts/participant-context';

// ----------------------------------------------------------------------

/**
 * Props pour le layout de l'espace participant
 */
type Props = {
  /** Contenu des pages enfants à afficher */
  children: React.ReactNode;
};

/**
 * Composant de layout interne qui utilise le contexte participant
 */
function ParticipantLayoutInner({ children }: Props) {
  // Import dynamique du layout pour éviter les problèmes de contexte
  const { ParticipantLayout } = require('src/layouts/participant');
  return <ParticipantLayout>{children}</ParticipantLayout>;
}

/**
 * Layout principal pour l'espace Participant
 * Intègre le contexte participant et gère l'authentification
 * 
 * @param children - Contenu des pages de l'espace participant
 * @returns Layout configuré avec contexte et authentification
 */
export default function Layout({ children }: Props) {
  // Configuration normale avec protection par authentification et contexte participant
  const renderLayout = () => (
    <ParticipantProvider>
      <ParticipantLayoutInner>{children}</ParticipantLayoutInner>
    </ParticipantProvider>
  );

  // Si l'authentification est désactivée en développement
  if (CONFIG.auth.skip) {
    return renderLayout();
  }

  // Configuration normale avec protection par authentification
  return (
    <AuthGuard>
      {renderLayout()}
    </AuthGuard>
  );
}