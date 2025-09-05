//src/app/participant/components/badge-button.tsx
'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { usePathname } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { useParticipantStatus } from 'src/contexts/participant-context';

// ----------------------------------------------------------------------

/**
 * Bouton pour afficher le badge du participant
 * Affiché uniquement après paiement effectué
 */
export function BadgeButton() {
  const { status } = useParticipantStatus();
  const pathname = usePathname();
  const [openBadgeDialog, setOpenBadgeDialog] = useState(false);

  // Détection de la section actuelle
  const isInEnligneSection = pathname.includes('/enligne');
  const isInEnpresentielSection = pathname.includes('/enpresentiel');

  // Logique d'affichage du badge selon le type de participation
  const shouldShowBadge = () => {
    if (!status.hasPaidActivities) return false;
    
    // Pour participation en présentiel : badge disponible après paiement
    if (isInEnpresentielSection) {
      return true;
    }
    
    // Pour participation en ligne : badge disponible seulement après "Suivre en direct"
    if (isInEnligneSection) {
      return status.hasConfirmedLiveFollow;
    }
    
    return false;
  };

  // N'afficher le bouton que selon les conditions définies
  if (!shouldShowBadge()) {
    return null;
  }

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        startIcon={<Iconify icon="solar:medal-ribbon-star-bold" />}
        onClick={() => setOpenBadgeDialog(true)}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 1,
          px: 2,
          fontSize: { xs: '0.75rem', md: '0.875rem' },
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Afficher mon badge
      </Button>

      {/* Dialog du badge */}
      <Dialog
        open={openBadgeDialog}
        onClose={() => setOpenBadgeDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 4,
            border: '3px solid',
            borderColor: 'text.primary'
          } 
        }}
      >
        <Box sx={{ p: 4, backgroundColor: 'grey.100', position: 'relative' }}>
          {/* Bouton fermer */}
          <IconButton
            onClick={() => setOpenBadgeDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500'
            }}
          >
            <Iconify icon="material-symbols:close" />
          </IconButton>

          {/* Header du badge */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.125rem' }
                }}
              >
                SARA 2023
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                <Iconify icon="solar:map-point-bold" width={16} color="text.secondary" />
                <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                  Du 24 sept. au 08 oct.
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 600, mt: 0.5 }}>
                VENEZ VIVRE LE SARA 2023
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              <Box 
                sx={{ 
                  width: 60, 
                  height: 40,
                  border: '2px solid',
                  borderColor: 'text.primary',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1
                }}
              >
                <Iconify icon="solar:user-id-bold" width={24} />
              </Box>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block' }}>
                Nom_Prénom
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block' }}>
                Adresse Email
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block' }}>
                Téléphone
              </Typography>
            </Box>
          </Stack>

          {/* QR Code */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                backgroundColor: 'white',
                border: '2px solid',
                borderColor: 'text.primary',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* QR Code simulé avec des carrés */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                width: '60%',
                height: '60%'
              }}>
                {[...Array(9)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? 'black' : index % 3 === 0 ? 'black' : 'transparent',
                      borderRadius: 0.5,
                      border: index % 2 !== 0 && index % 3 !== 0 ? '1px solid black' : 'none'
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.125rem' },
                mb: 0.5
              }}
            >
              CODE PARTICIPANT: UM8765
            </Typography>
          </Box>

          {/* Message d'instruction */}
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center',
              fontSize: '0.75rem',
              lineHeight: 1.4,
              color: 'text.secondary'
            }}
          >
            Ce badge vous donne accès à vos activités de récréation. Veuillez présenter ce badge lors de votre admission.
          </Typography>

          {/* Décoration flocons de neige */}
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              opacity: 0.1
            }}
          >
            <Iconify icon="solar:snowflake-bold" width={24} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              opacity: 0.1
            }}
          >
            <Iconify icon="solar:snowflake-bold" width={24} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 60,
              left: 30,
              opacity: 0.1
            }}
          >
            <Iconify icon="solar:snowflake-bold" width={16} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 60,
              right: 40,
              opacity: 0.1
            }}
          >
            <Iconify icon="solar:snowflake-bold" width={16} />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}