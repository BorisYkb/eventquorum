//src/app/participant/enligne/paiement/page.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/participant';

import { Iconify } from 'src/components/iconify';

import { useParticipantStatus } from 'src/contexts/participant-context';

// ----------------------------------------------------------------------

/**
 * Données simulées des sessions en ligne sélectionnées
 */
const selectedActivitiesData = [
  {
    id: '1',
    timeSlot: '11H00 12H00',
    title: 'PANEL DE HAUT NIVEAU - WEBINAIRE',
    price: 35000,
    currency: 'Devise',
    type: 'Premium',
    status: 'En cours'
  },
  {
    id: '2',
    timeSlot: '14H00 15H00', 
    title: 'ATELIER INTERACTIF - Q&A EN DIRECT',
    price: 15000,
    currency: 'Devise',
    type: 'VIP',
    status: 'Non démarré'
  },
  {
    id: '3',
    timeSlot: '12H00 13H00',
    title: 'NETWORKING VIRTUEL',
    price: 3000,
    currency: 'Devise',
    type: 'Standard',
    status: 'Non démarré'
  }
];

// ----------------------------------------------------------------------

/**
 * Page de paiement pour les sessions en ligne
 */
export default function PaiementEnlignePage() {
  const router = useRouter();
  const { updateStatus } = useParticipantStatus();

  // États du formulaire
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Calcul du total
  const totalAmount = selectedActivitiesData.reduce((sum, activity) => sum + activity.price, 0);

  /**
   * Formatage du prix
   */
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  /**
   * Gestion de l'annulation
   */
  const handleCancel = () => {
    router.back();
  };

  /**
   * Gestion de la validation du paiement
   */
  const handleValidate = () => {
    if (!paymentMethod) {
      alert('Veuillez sélectionner un mode de paiement');
      return;
    }
    
    if (!phoneNumber) {
      alert('Veuillez saisir votre numéro de téléphone');
      return;
    }

    // Simulation du traitement du paiement
    setTimeout(() => {
      setShowSuccessDialog(true);
    }, 1000);
  };

  /**
   * Gestion de la fermeture du dialog de succès
   * ✅ CORRECTION : Redirection vers /participant/enligne
   */
  const handleSuccessClose = () => {
    // Mise à jour du contexte : paiement effectué
    updateStatus({
      hasPaidActivities: true
    });

    setShowSuccessDialog(false);
    
    // Redirection vers la page d'accueil enligne
    router.push('/participant/enligne');
  };

  return (
    <>
      <DashboardContent maxWidth="md">
        <Box sx={{ py: { xs: 2, md: 3 } }}>
          
          {/* En-tête */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 500, 
                color: 'success.main', // Couleur success pour enligne
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
              }}
            >
              Résumé de vos sessions en ligne
            </Typography>
          </Box>

          {/* Résumé des sessions */}
          <Card sx={{ borderRadius: 2, mb: 4 }}>
            <Box sx={{ p: 3, backgroundColor: 'success.lighter' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'success.dark',
                  fontWeight: 400,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Vous avez sélectionné {selectedActivitiesData.length} session{selectedActivitiesData.length > 1 ? 's' : ''} interactive{selectedActivitiesData.length > 1 ? 's' : ''}
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                {selectedActivitiesData.map((activity, index) => (
                  <Stack 
                    key={activity.id}
                    direction={{ xs: 'column', sm: 'row' }} 
                    justifyContent="space-between" 
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={1}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 400,
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}
                    >
                      {activity.timeSlot} {activity.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'success.main',
                        fontWeight: 400,
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}
                    >
                      {formatPrice(activity.price)} ({activity.currency}) {activity.type !== 'Standard' && `(${activity.type})`}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: activity.status === 'En cours' ? 'success.main' : 'warning.main',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {activity.status}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '1.125rem', md: '1.25rem' }
                  }}
                >
                  Total
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'success.main',
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}
                >
                  {formatPrice(totalAmount)} ({selectedActivitiesData[0]?.currency || 'Devise'})
                </Typography>
              </Stack>
            </Box>
          </Card>

          {/* Formulaire de paiement */}
          <Card sx={{ borderRadius: 2, mb: 4 }}>
            <Box sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 500,
                  fontSize: { xs: '1rem', md: '1.125rem' }
                }}
              >
                Préciser les informations du mode de paiement
              </Typography>

              <Stack spacing={3}>
                {/* Sélection du mode de paiement */}
                <FormControl fullWidth>
                  <InputLabel>Choix d'un mode de paiement</InputLabel>
                  <Select
                    value={paymentMethod}
                    label="Choix d'un mode de paiement"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value="orange-ci">Orange CI</MenuItem>
                    <MenuItem value="mtn-ci">MTN CI</MenuItem>
                    <MenuItem value="moov-ci">MOOV CI</MenuItem>
                    <MenuItem value="wave-ci">WAVE CI</MenuItem>
                    <MenuItem value="stripe">STRIPE (Visa, MasterCard, ...)</MenuItem>
                  </Select>
                </FormControl>

                {/* Numéro de téléphone */}
                <TextField
                  fullWidth
                  label="Compte émetteur"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                />

                {/* Informations additionnelles */}
                <TextField
                  fullWidth
                  label="Autres infos"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Informations complémentaires"
                />
              </Stack>
            </Box>
          </Card>

          {/* Boutons d'action */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              sx={{
                minWidth: { xs: '100%', sm: 120 },
                py: 1.25,
                textTransform: 'uppercase',
                fontWeight: 500,
                borderRadius: 1
              }}
            >
              Annuler
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleValidate}
              sx={{
                minWidth: { xs: '100%', sm: 120 },
                py: 1.25,
                textTransform: 'uppercase',
                fontWeight: 500,
                borderRadius: 1
              }}
            >
              Valider
            </Button>
          </Stack>
        </Box>
      </DashboardContent>

      {/* Dialog de succès */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 4 } }}
      >
        <Box sx={{ textAlign: 'center' }}>
          {/* Bouton fermer */}
          <IconButton
            onClick={handleSuccessClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'error.main'
            }}
          >
            <Iconify icon="material-symbols:close" />
          </IconButton>

          {/* Icône de succès */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '4px solid',
              borderColor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              mt: 2
            }}
          >
            <Iconify 
              icon="material-symbols:check" 
              width={40} 
              color="success.main" 
            />
          </Box>

          {/* Message */}
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'success.main',
              fontWeight: 500,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Paiement effectué
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}