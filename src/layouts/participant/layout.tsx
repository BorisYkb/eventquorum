//src/layouts/participant/layout.tsx - VERSION CORRIGÉE
'use client';

import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import { useState } from 'react';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import { NavMobile } from './nav-mobile';
import { VerticalDivider } from './content';
import { NavVertical } from './nav-vertical';
import { layoutClasses } from '../core/classes';
import { _account, _accountParticipant } from '../nav-config-account'; // Import corrigé
import { MainSection } from '../core/main-section';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { useParticipantNavData } from '../nav-config-participant-dynamic';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';
import { Typography, Button } from '@mui/material';
import { ParticipantAccountDrawer } from '../components/participant/participant-account-drawer';
import { LiveFollowDialog } from 'src/app/participant/components/live-follow-dialog';
import { useParticipantStatus } from 'src/contexts/participant-context';
import { BadgeButton } from 'src/app/participant/components/badge-button';
import { usePathname } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Props de base pour le layout, héritées de LayoutSectionProps
 */
type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

/**
 * Props pour le layout dashboard de l'espace participant
 */
export type DashboardLayoutProps = LayoutBaseProps & {
  /** Breakpoint pour les requêtes de layout responsive */
  layoutQuery?: Breakpoint;
  /** Props pour personnaliser les différentes sections du layout */
  slotProps?: {
    /** Props pour la section header */
    header?: HeaderSectionProps;
    /** Props pour la navigation */
    nav?: {
      /** Données de navigation personnalisées */
      data?: NavSectionProps['data'];
    };
    /** Props pour la section principale */
    main?: MainSectionProps;
  };
};

/**
 * Layout principal pour l'espace Participant
 * Gère la structure générale avec header, navigation latérale et contenu principal
 */
export function ParticipantLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { status } = useParticipantStatus();
  const pathname = usePathname();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, 'vertical');
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();
  const [openLiveDialog, setOpenLiveDialog] = useState(false);

  const navData = useParticipantNavData();

  const shouldShowLiveButton = 
    pathname.includes('/enligne') && 
    status.participationType === 'enligne' &&
    status.hasPaidActivities && 
    !status.hasConfirmedLiveFollow;

  const isNavMini = settings.state.navLayout === 'mini';
  const isNavVertical = isNavMini || settings.state.navLayout === 'vertical';

  /**
   * Rendu de la section header avec logo, menu mobile et compte utilisateur
   */
  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
        sx: {
          px: { [layoutQuery]: 5 },
          height: { [layoutQuery]: '64px' },
        },
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: (
        <>
          <MenuButton
            onClick={onOpen}
            sx={{ 
              mr: 1, 
              ml: -1, 
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' } 
            }}
          />
          <NavMobile data={navData} open={open} onClose={onClose} cssVars={navVars.section} />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          {/* DEBUG: Ajoutons des logs pour comprendre le problème */}
          {(() => {
            console.log('DEBUG Layout - pathname:', pathname);
            console.log('DEBUG Layout - status.hasConfirmedPresence:', status.hasConfirmedPresence);
            console.log('DEBUG Layout - shouldShowConfirmButton:', pathname === '/participant' && !status.hasConfirmedPresence);
            return null;
          })()}

          {/* Bouton "Confirmer ma Présence" - affiché seulement sur la page initiale */}
          {(pathname === '/participant' || pathname === '/participant/') && !status.hasConfirmedPresence && (
            <Button
              variant="contained"
              color="success"
              size="medium"
              startIcon={<Iconify icon="solar:calendar-mark-bold" />}
              onClick={() => {
                console.log('Bouton Confirmer ma Présence cliqué');
                window.dispatchEvent(new CustomEvent('openConfirmationDialog'));
              }}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.775rem', sm: '0.9rem' },
                boxShadow: (theme) => theme.customShadows.success,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.customShadows.z16,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Confirmer ma Présence
            </Button>
          )}

          {/* Bouton "Suivre en Direct" pour enligne */}
          {shouldShowLiveButton && (
            <Button
              variant="contained"
              color="success"
              size="medium"
              startIcon={<Iconify icon="solar:videocamera-record-bold" />}
              onClick={() => setOpenLiveDialog(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: (theme) => theme.customShadows.success,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: (theme) => theme.customShadows.z16,
                },
                transition: 'all 0.2s ease',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              Suivre en Direct
            </Button>
          )}

          {/* Bouton Badge - affiché après paiement */}
          <BadgeButton />

          {/* Drawer compte participant */}
          <ParticipantAccountDrawer data={_accountParticipant} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation
        {...slotProps?.header}
        slots={headerSlots}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  /**
   * Rendu de la navigation latérale verticale
   */
  const renderSidebar = () => (
    <NavVertical
      data={navData}
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      cssVars={navVars.section}
      onToggleNav={() =>
        settings.setField(
          'navLayout',
          settings.state.navLayout === 'vertical' ? 'mini' : 'vertical'
        )
      }
    />
  );

  /**
   * Rendu du footer
   */
  const renderFooter = () => null;

  /**
   * Rendu de la section principale
   */
  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      headerSection={renderHeader()}
      sidebarSection={renderSidebar()}
      footerSection={renderFooter()}
      cssVars={{ 
        ...dashboardLayoutVars(theme), 
        ...navVars.layout, 
        ...cssVars 
      }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: isNavMini 
                ? 'var(--layout-nav-mini-width)' 
                : 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
      
      {/* Dialog "Suivre en Direct" */}
      <LiveFollowDialog 
        open={openLiveDialog} 
        onClose={() => setOpenLiveDialog(false)} 
      />
    </LayoutSection>
  );
}