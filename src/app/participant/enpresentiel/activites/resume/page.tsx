//src/app/participant/enpresentiel/activites/resume/page.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/participant';
import { PaymentMethodDialog } from 'src/app/participant/components/payment-method-dialog';

// ----------------------------------------------------------------------

/**
 * Données simulées des activités sélectionnées
 * En production, ces données viendraient du contexte ou de l'état global
 */
const selectedActivitiesData = [
  {
    id: '1',
    timeSlot: '11H00 12H00',
    title: 'PANEL DE HAUT NIVEAU',
    price: 100000,
    currency: 'Devise',
    type: 'VIP',
    status: 'En cours',
    statusColor: 'success.main'
  },
  {
    id: '2',
    timeSlot: '12H00 13H00',
    title: 'PAUSE CAFÉ',
    price: 10000,
    currency: 'Devise',
    type: 'Standard',
    status: 'Non démarré',
    statusColor: 'warning.main'
  },
  {
    id: '3',
    timeSlot: '13H00 14H00',
    title: 'COOLING BREAK',
    price: 0, // Gratuit ou inclus
    currency: 'Devise',
    type: 'Standard',
    status: 'Non démarré',
    statusColor: 'warning.main'
  },
  {
    id: '4',
    timeSlot: '14H00 15H00',
    title: 'WORKSHOP',
    price: 25000,
    currency: 'Devise',
    type: 'Standard',
    status: 'Non démarré',
    statusColor: 'warning.main'
  }
];

// ----------------------------------------------------------------------

/**
 * Page de résumé des activités sélectionnées
 * Affiche un récapitulatif avant validation du paiement
 */
export default function ResumeActivitesPage() {


  const router = useRouter();

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  // Calcul du total
  const totalAmount = selectedActivitiesData.reduce((sum, activity) => sum + activity.price, 0);

  /**
   * Retour à la page de sélection pour modifier
   */
  const handleModifier = () => {
    router.back(); // Retour à la page précédente
  };

  /**
   * Validation et redirection vers le paiement
   */
    const handleValider = () => {
        setOpenPaymentDialog(true);
    };

  /**
   * Formatage du prix avec séparateurs de milliers
   */
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  return (
    <DashboardContent maxWidth="md">
      <Box sx={{ py: { xs: 2, md: 3 } }}>
        
        {/* En-tête */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: 'error.main',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
              mb: 1
            }}
          >
            Résumé des activités sélectionnées
          </Typography>
        </Box>

        {/* Carte principale du résumé */}
        <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
          
          {/* En-tête de la liste */}
          <Box sx={{ p: 3, backgroundColor: 'grey.100' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                mb: 1
              }}
            >
              La liste des activités sélectionnées
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'success.main',
                fontWeight: 500,
                fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem' }
              }}
            >
              Vous avez sélectionné {selectedActivitiesData.length} activité{selectedActivitiesData.length > 1 ? 's' : ''}
            </Typography>
          </Box>

          {/* Liste des activités */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={3}>
              {selectedActivitiesData.map((activity, index) => (
                <Box key={activity.id}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    justifyContent="space-between" 
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    {/* Informations de l'activité */}
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem', lg: '1.125rem' },
                          mb: 0.5
                        }}
                      >
                        {activity.timeSlot} {activity.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: activity.statusColor,
                          fontWeight: 500,
                          fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' }
                        }}
                      >
                        {activity.status}
                      </Typography>
                    </Box>

                    {/* Prix */}
                    <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'primary.main',
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                        }}
                      >
                        {formatPrice(activity.price)} ({activity.currency})
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          display: 'block'
                        }}
                      >
                        {activity.type}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  {/* Divider entre les activités */}
                  {index < selectedActivitiesData.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Section Total */}
          <Box 
            sx={{ 
              p: 3, 
              backgroundColor: 'grey.50',
              borderTop: '2px solid',
              borderColor: 'divider'
            }}
          >
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                Total
              </Typography>
              
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800,
                  color: 'primary.main',
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' }
                }}
              >
                {formatPrice(totalAmount)} ({selectedActivitiesData[0]?.currency || 'Devise'})
              </Typography>
            </Stack>
          </Box>
        </Card>

        {/* Boutons d'action */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          alignItems="center"
        >
          {/* Bouton Modifier */}
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={handleModifier}
            sx={{
              minWidth: { xs: '100%', sm: 140 },
              py: { xs: 1.25, md: 1.5 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 600,
              textTransform: 'uppercase',
              borderRadius: 1,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Modifier
          </Button>

          {/* Bouton Valider */}
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleValider}
            sx={{
              minWidth: { xs: '100%', sm: 140 },
              py: { xs: 1.25, md: 1.5 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 600,
              textTransform: 'uppercase',
              borderRadius: 1,
              boxShadow: (theme) => theme.customShadows.success,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.customShadows.z16,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Valider
          </Button>
        </Stack>

        {/* Note informative */}
        <Box 
          sx={{ 
            mt: 3, 
            p: 2, 
            borderRadius: 1, 
            backgroundColor: 'info.lighter',
            border: '1px solid',
            borderColor: 'info.light',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'info.dark',
              fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
              lineHeight: 1.5
            }}
          >
            Vérifiez bien votre sélection avant de valider. 
            Après validation, vous serez dirigé vers le choix du mode de paiement.
          </Typography>
        </Box>
      </Box>
          {/* Dialog de choix du mode de paiement */}
          <PaymentMethodDialog
              open={openPaymentDialog}
              onClose={() => setOpenPaymentDialog(false)}
          />
    </DashboardContent>
  );
}

// // Export par défaut requis pour Next.js
// export default function Page() {
//   return <ResumeActivitesView />;
// }