//src/sections/overview/participant/view/overview-participant-view.tsx
'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/participant';
import { MotivationIllustration } from 'src/assets/illustrations';

import { useMockedUser } from 'src/auth/hooks';

import { Iconify } from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';

import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';
import { ParticipantWelcome } from 'src/app/participant/components/participant-welcome';
import { ConfirmationPresenceDialog } from 'src/app/participant/components/confirmation-presence-dialog';

// ----------------------------------------------------------------------

/**
 * Données fictives du programme SARA 2023
 */
const programmeData = [
  {
    id: '1',
    time: '08H00',
    title: 'OUVERTURE DU SALON ET DU SARA MARKET AU PUBLIC',
    status: 'Terminé',
    statusColor: 'error' as const,
  },
  {
    id: '2', 
    time: '12H00',
    title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
    status: 'En cours',
    statusColor: 'warning' as const,
  },
  {
    id: '3',
    time: '14H00', 
    title: 'POINT DE PRESSE (SALLE DE CONFÉRENCE)',
    status: '',
    statusColor: 'default' as const,
  },
  {
    id: '4',
    time: '14H00',
    title: 'PANEL DE HAUT NIVEAU (LES ASSISES DU SARA 2023)',
    status: 'Non démarré',
    statusColor: 'info' as const,
  },
  {
    id: '5',
    time: '15H00',
    title: 'VERNISSAGE DU SALON ET DU SARA MARKET AU PUBLIC',
    status: '',
    statusColor: 'default' as const,
  },
  {
    id: '6',
    time: '16H00',
    title: 'NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)',
    status: 'En cours',
    statusColor: 'success' as const,
  }
];

// ----------------------------------------------------------------------

/**
 * Vue d'accueil principale pour l'espace Participant
 */
export function OverviewParticipantView() {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useMockedUser();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Hook pour détecter la taille d'écran côté client
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Composant d'informations pratiques séparé pour une meilleure gestion responsive
   */
  const renderInformationsPratiques = () => (
    <Card sx={{ p: 3, borderRadius: 2, height: 'fit-content' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } 
        }}
      >
        Informations pratiques
      </Typography>
      
      <Stack 
        direction={{ xs: 'row', md: 'column' }} 
        spacing={{ xs: 2, md: 2 }}
        sx={{ 
          overflowX: { xs: 'auto', md: 'visible' },
          pb: { xs: 1, md: 0 }
        }}
      >
        <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600, 
              mb: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
            }}
          >
            📅 Dates
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
            }}
          >
            Du 15 au 18 Novembre 2023
          </Typography>
        </Box>
        
        <Divider 
          orientation={isMobile ? 'vertical' : 'horizontal'}
          flexItem 
          sx={{ 
            mx: { xs: 1, md: 0 },
            my: { xs: 0, md: 1 }
          }} 
        />
        
        <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600, 
              mb: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
            }}
          >
            📍 Lieu
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
            }}
          >
            Palais des Congrès d'Abidjan
          </Typography>
        </Box>
        
        <Divider 
          orientation={isMobile ? 'vertical' : 'horizontal'}
          flexItem 
          sx={{ 
            mx: { xs: 1, md: 0 },
            my: { xs: 0, md: 1 }
          }} 
        />
        
        <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600, 
              mb: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
            }}
          >
            ⏰ Horaires
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
            }}
          >
            8h00 - 18h00 chaque jour
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  /**
   * Gestion de la confirmation de présence
   */

  /**
   * Rendu de la section vidéo principale
   */
  const renderVideoSection = () => (
    <Card 
      sx={{ 
        mb: 3,
        borderRadius: { xs: 1, md: 2 },
        overflow: 'hidden',
        boxShadow: (theme) => theme.customShadows.z12
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          backgroundColor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.darker',
          }}
        >
          <IconButton
            size="large"
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
            }}
          >
            <Iconify icon="solar:play-bold" width={40} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );

  /**
   * Rendu de la section programme avec accordéon
   */
  const renderProgrammeSection = () => (
    <Card sx={{ borderRadius: { xs: 1, md: 2 }, overflow: 'hidden', height: 'fit-content' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 600, 
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem' }
          }}
        >
          PROGRAMME SARA 2023
        </Typography>
        
        <Box>
          {programmeData.map((item, index) => (
            <Accordion 
              key={item.id}
              sx={{
                '&:before': { display: 'none' },
                // boxShadow: 'none',
                // border: '1px solid',
                // borderColor: 'divider',
                // borderRadius: '8px !important',
                // mb: 1,
                // '&.Mui-expanded': {
                //   borderColor: 'primary.main',
                //   backgroundColor: 'primary.lighter',
                // },
              }}
            >
              <AccordionSummary 
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                sx={{
                  px: { xs: 1.5, md: 2 },
                  py: 1,
                  minHeight: { xs: 48, md: 60 },
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                  },
                }}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems={{ xs: 'flex-start', sm: 'center' }} 
                  spacing={{ xs: 1, sm: 2 }} 
                  sx={{ width: '100%' }}
                >
                  <Chip
                    label={item.time}
                    size="small"
                    sx={{
                      minWidth: { xs: 50, md: 60 },
                      fontWeight: 600,
                      // backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      fontSize: { xs: '0.625rem', md: '0.75rem' }
                    }}
                  />
                  
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      flex: 1, 
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem', lg: '1rem' }
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  {item.status && (
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.statusColor}
                      variant="soft"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.625rem', md: '0.75rem' }
                      }}
                    />
                  )}
                </Stack>
              </AccordionSummary>
              
              <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: 2 }}>
                <Stack spacing={1}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.7rem', md: '0.875rem' }
                    }}
                  >
                    Type d'activité: <strong>Atelier/Workshop</strong>
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                      lineHeight: { xs: 1.4, md: 1.5 }
                    }}
                  >
                    Description détaillée de l'activité du programme. Cette section peut contenir des informations 
                    supplémentaires sur les intervenants, le lieu exact, les prérequis ou tout autre détail pertinent.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button 
                      size="small" 
                      startIcon={<Iconify icon="solar:document-text-bold" />}
                      sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                    >
                      Document
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<Iconify icon="solar:videocamera-record-bold" />}
                      sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                    >
                      Voir la vidéo
                    </Button>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  /**
   * Rendu du dialog de confirmation de présence
   */
  const renderConfirmationDialog = () => (
    <ConfirmationPresenceDialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
    />
);


  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3} sx={{ py: { xs: 2, md: 3 } }}>
        
        {/* 1. Section Welcome - Pleine largeur */}
        <Grid size={{ xs: 12 }}>
          <ParticipantWelcome
            title={`Bienvenu(e) cher(e) participant(e)\nLE SARA, UN ÉVÉNEMENT INCONTOURNABLE`}
            description="Le SARA 2023 se tiendra dans le tout nouveau Complexe d'Abidjan. En seulement cinq éditions, le SARA s'est imposé comme le salon de référence en matière d'agriculture."
            img={<MotivationIllustration hideBackground />}
            action={
              <Button
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                startIcon={<Iconify icon="solar:calendar-mark-bold" />}
                onClick={() => setOpenDialog(true)}
                color="success"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '0.775rem', md: '0.9rem' },
                  // boxShadow: (theme) => theme.customShadows.primary,
                  // '&:hover': {
                  //   transform: 'translateY(-2px)',
                  //   boxShadow: (theme) => theme.customShadows.z16,
                  // },
                  // transition: 'all 0.3s ease',
                }}
              >
                Confirmer ma Présence
              </Button>
            }
          />
        </Grid>

        {/* 2. Ligne Vidéo + Informations pratiques */}
        <Grid size={{ xs: 12, md: 8 }}>
          {renderVideoSection()}
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          {renderInformationsPratiques()}
        </Grid>

        {/* 3. Ligne Programme - Pleine largeur */}
        <Grid size={{ xs: 12 }}>
          {renderProgrammeSection()}
        </Grid>
        
        {/* 4. Carousel des sponsors - Pleine largeur */}
        <Grid size={{ xs: 12 }}>
          <IntervenantCarousel />
        </Grid>
        
        {/* 5. Footer - Pleine largeur */}
        <Footer />
        
        {renderConfirmationDialog()}
      </Grid>
    </DashboardContent>
  );
}