//src/app/participant/components/live-follow-dialog.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { LoadingButton } from '@mui/lab';

import { Iconify } from 'src/components/iconify';

import { useParticipantStatus } from 'src/contexts/participant-context';

// ----------------------------------------------------------------------

type Props = {
  /** État d'ouverture du dialog */
  open: boolean;
  /** Fonction de fermeture du dialog */
  onClose: () => void;
};

/**
 * Dialog de confirmation pour suivre l'événement en direct
 * Uniquement pour les participants en ligne après paiement
 */
export function LiveFollowDialog({ open, onClose }: Props) {
  const { updateStatus } = useParticipantStatus();
  
  // États locaux
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /**
   * Gestion de la confirmation pour suivre en direct
   */
  const handleConfirmLiveFollow = async () => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mise à jour du statut participant - débloque l'onglet "Mes Interactions"
      updateStatus({
        hasConfirmedLiveFollow: true,
        currentStep: 'live_ready'
      });
      
      // Fermeture du dialog
      onClose();
      
      // Affichage de l'alerte de succès
      setShowAlert(true);
      
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gestion de la fermeture du dialog
   */
  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 2, 
            p: { xs: 3, md: 4 },
            maxWidth: 500
          } 
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          {/* Icône principale */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'success.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <Iconify 
                icon="solar:videocamera-record-bold" 
                width={40} 
                color="success.main" 
              />
            </Box>
          </Box>

          {/* Titre principal */}
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              color: 'text.primary'
            }}
          >
            Suivre l'événement en direct
          </Typography>
          
          {/* Description */}
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.6,
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            Vous êtes sur le point de rejoindre l'événement en direct. 
            Cela débloquera l'accès complet aux interactions, au chat en direct 
            et aux fonctionnalités collaboratives.
          </Typography>

          {/* Fonctionnalités débloquées */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: 'success.main' 
              }}
            >
              Fonctionnalités disponibles :
            </Typography>
            
            <Stack spacing={1.5} alignItems="flex-start" sx={{ maxWidth: 300, mx: 'auto' }}>
              {[
                { icon: 'solar:chat-round-bold', text: 'Chat en temps réel' },
                { icon: 'solar:users-group-rounded-bold', text: 'Interactions avec les participants' },
                { icon: 'solar:hand-stars-bold', text: 'Questions & Réponses' },
                { icon: 'solar:document-text-bold', text: 'Ressources partagées' },
                { icon: 'solar:notification-bing-bold', text: 'Notifications en direct' }
              ].map((item, index) => (
                <Stack key={index} direction="row" spacing={1.5} alignItems="center">
                  <Iconify 
                    icon={item.icon} 
                    width={20} 
                    color="success.main" 
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}
                  >
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Boutons d'action */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Button 
              onClick={handleClose}
              disabled={isLoading}
              variant="outlined"
              sx={{ 
                color: 'text.secondary',
                borderColor: 'divider',
                textTransform: 'none', 
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 500,
                minWidth: 120,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'text.secondary',
                }
              }}
            >
              Plus tard
            </Button>
            
            <LoadingButton
              loading={isLoading}
              onClick={handleConfirmLiveFollow}
              variant="contained"
              color="success"
              loadingPosition="start"
              startIcon={<Iconify icon="solar:play-circle-bold" />}
              sx={{ 
                textTransform: 'none', 
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                minWidth: 180,
                px: 3,
                py: 1.5,
                '& .MuiLoadingButton-loadingIndicator': {
                  color: 'white',
                }
              }}
            >
              Rejoindre maintenant
            </LoadingButton>
          </Stack>

          {/* Note informative */}
          <Box 
            sx={{ 
              mt: 3, 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: 'info.lighter',
              border: '1px solid',
              borderColor: 'info.light'
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'info.dark',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                display: 'block',
                lineHeight: 1.4
              }}
            >
              <Iconify 
                icon="solar:info-circle-bold" 
                width={16} 
                sx={{ mr: 0.5, verticalAlign: 'middle' }} 
              />
              Vous pourrez accéder aux interactions à tout moment après avoir rejoint l'événement
            </Typography>
          </Box>
        </Box>
      </Dialog>

      {/* Alert de succès */}
      <Snackbar 
        open={showAlert} 
        autoHideDuration={4000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Bienvenue dans l'événement en direct ! L'onglet "Mes Interactions" est maintenant disponible.
        </Alert>
      </Snackbar>
    </>
  );
}