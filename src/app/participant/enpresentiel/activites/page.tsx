//src/app/participant/enpresentiel/activites/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';

import { DashboardContent } from 'src/layouts/participant';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';
import { useParticipantStatus } from 'src/contexts/participant-context';

// ----------------------------------------------------------------------

/**
 * Données des activités disponibles
 */
const activitiesData = [
  {
    id: '1',
    timeSlot: '09H00 10H00',
    title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
    status: 'Non démarré',
    statusColor: 'warning' as const,
    priceOptions: [
      { id: 'standard', label: 'Standard(5 000)', price: 5000, currency: 'Devise' },
      { id: 'vip20', label: 'VIP(20 000)', price: 20000, currency: 'Devise' },
      { id: 'vip50', label: 'VIP(50 000)', price: 50000, currency: 'Devise' },
    ]
  },
  {
    id: '2',
    timeSlot: '10H00 11H00',
    title: 'POINT DE PRESSE',
    status: 'En Cours',
    statusColor: 'success' as const,
    priceOptions: [
      { id: 'standard', label: 'Standard(5 000)', price: 5000, currency: 'Devise' },
      { id: 'vip20', label: 'VIP(20 000)', price: 20000, currency: 'Devise' },
      { id: 'vip50', label: 'VIP(50 000)', price: 50000, currency: 'Devise' },
    ]
  },
  {
    id: '3',
    timeSlot: '11H00 12H00',
    title: 'PANEL DE HAUT NIVEAU',
    status: 'En cours',
    statusColor: 'info' as const,
    priceOptions: [
      { id: 'standard', label: 'Standard(5 000)', price: 5000, currency: 'Devise' },
      { id: 'vip20', label: 'VIP(20 000)', price: 20000, currency: 'Devise' },
      { id: 'vip50', label: 'VIP(50 000)', price: 50000, currency: 'Devise' },
    ]
  },
  {
    id: '4',
    timeSlot: '12H00 13H00',
    title: 'PAUSE CAFÉ',
    status: 'Non démarré',
    statusColor: 'warning' as const,
    priceOptions: [
      { id: 'standard', label: 'Standard(5 000)', price: 5000, currency: 'Devise' },
      { id: 'vip20', label: 'VIP(20 000)', price: 20000, currency: 'Devise' },
      { id: 'vip50', label: 'VIP(50 000)', price: 50000, currency: 'Devise' },
    ]
  },
  {
    id: '5',
    timeSlot: '13H00 14H00',
    title: 'COOLING BREAK',
    status: 'Non démarré',
    statusColor: 'warning' as const,
    priceOptions: [
      { id: 'standard', label: 'Standard(5 000)', price: 5000, currency: 'Devise' },
      { id: 'vip20', label: 'VIP(20 000)', price: 20000, currency: 'Devise' },
      { id: 'vip50', label: 'VIP(50 000)', price: 50000, currency: 'Devise' },
    ]
  },
];

// ----------------------------------------------------------------------

/**
 * Interface pour les activités sélectionnées
 */
interface SelectedActivity {
  activityId: string;
  selectedPrice: string;
}

/**
 * Page d'activités pour la participation en présentiel
 * Permet au participant de sélectionner les ateliers et types de places
 */
export default function ActivitesEnPresentielPage() {
  const { updateStatus } = useParticipantStatus();
  const router = useRouter();

  // États pour les sélections
  const [selectedActivities, setSelectedActivities] = useState<SelectedActivity[]>([]);

  /**
   * Gestion de la sélection/désélection d'une activité
   */
  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities(prev => {
      const existingIndex = prev.findIndex(item => item.activityId === activityId);

      if (existingIndex >= 0) {
        // Désélectionner l'activité
        return prev.filter(item => item.activityId !== activityId);
      } else {
        // Sélectionner l'activité avec l'option standard par défaut
        return [...prev, {
          activityId,
          selectedPrice: 'standard'
        }];
      }
    });
  };

  /**
   * Gestion du changement de type de place pour une activité
   */
  const handlePriceChange = (activityId: string, priceId: string) => {
    setSelectedActivities(prev =>
      prev.map(item =>
        item.activityId === activityId
          ? { ...item, selectedPrice: priceId }
          : item
      )
    );
  };

  /**
   * Vérifier si une activité est sélectionnée
   */
  const isActivitySelected = (activityId: string) => {
    return selectedActivities.some(item => item.activityId === activityId);
  };

  /**
   * Obtenir le type de place sélectionné pour une activité
   */
  const getSelectedPrice = (activityId: string) => {
    const found = selectedActivities.find(item => item.activityId === activityId);
    return found?.selectedPrice || 'standard';
  };

  /**
   * Gestion du bouton Suivant - redirection vers le paiement
   */
  const handleNext = () => {
    if (selectedActivities.length === 0) {
      alert('Veuillez sélectionner au moins une activité');
      return;
    }

    // Sauvegarder les sélections (localStorage ou contexte)
    localStorage.setItem('selectedActivities', JSON.stringify(selectedActivities));

    // Redirection vers la page de résumé
    router.push('/participant/enpresentiel/activites/resume');
  };

  /**
   * Calcul du nombre d'activités sélectionnées
   */
  const selectedCount = selectedActivities.length;

  return (
    <DashboardContent maxWidth="lg">
      <Box sx={{ py: { xs: 2, md: 3 } }}>

        {/* En-tête */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'error.main',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Veuillez sélectionner un ou plusieurs ateliers à suivre
          </Typography>
        </Box>

        {/* Liste des activités */}
        <Card sx={{ p: 3, borderRadius: 2, mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            La liste des activités au programme
          </Typography>

          <Stack spacing={2}>
            {activitiesData.map((activity) => {
              const isSelected = isActivitySelected(activity.id);
              const selectedPrice = getSelectedPrice(activity.id);

              return (
                <Card
                  key={activity.id}
                  sx={{
                    p: 2,
                    border: '2px solid',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    backgroundColor: 'background.paper',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    {/* Checkbox de sélection */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleActivityToggle(activity.id)}
                          sx={{
                            p: { xs: 0.25, md: 0.5 },
                            '& .MuiSvgIcon-root': { fontSize: { xs: 18, sm: 20, md: 24 } }
                          }}
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />

                    {/* Contenu de l'activité */}
                    <Box sx={{ flex: 1 }}>
                      {/* En-tête avec horaires et titre */}
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={1}
                        sx={{ mb: 2 }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '0.8rem', sm: '0.875rem', md: '1rem', lg: '1.1rem' }
                          }}
                        >
                          {activity.timeSlot} {activity.title}
                        </Typography>

                        <Chip
                          label={activity.status}
                          color={activity.statusColor}
                          size="small"
                          variant="soft"
                          sx={{
                            fontWeight: 500,
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
                            height: { xs: 20, md: 24 }
                          }}
                        />
                      </Stack>

                      {/* Options de prix */}
                      {isSelected && (
                        <Box sx={{ ml: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.825rem', lg: '0.875rem' }
                            }}
                          >
                            Type de place:
                          </Typography>

                          <FormControl component="fieldset">
                            <RadioGroup
                              value={selectedPrice}
                              onChange={(e) => handlePriceChange(activity.id, e.target.value)}
                              sx={{
                                '& .MuiFormControlLabel-root': {
                                  mb: { xs: 0.5, md: 1 }
                                }
                              }}
                            >
                              {activity.priceOptions.map((option) => (
                                <FormControlLabel
                                  key={option.id}
                                  value={option.id}
                                  control={
                                    <Radio
                                      size="small"
                                      sx={{
                                        '& .MuiSvgIcon-root': {
                                          fontSize: { xs: 16, md: 20 }
                                        }
                                      }}
                                    />
                                  }
                                  label={
                                    <Stack direction="row" spacing={1} alignItems="center">
                                      <Typography
                                        variant="body2"
                                        sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.825rem', lg: '0.875rem' } }}
                                      >
                                        {option.label}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: 'text.secondary',
                                          fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }
                                        }}
                                      >
                                        {option.currency}
                                      </Typography>
                                    </Stack>
                                  }
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </Card>

        {/* Bouton Suivant */}
        <Box sx={{ textAlign: 'right', px: { xs: 2, md: 4 } }}>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={handleNext}
            disabled={selectedCount === 0}
            sx={{
              minWidth: { xs: 140, md: 160 },
              py: { xs: 1, md: 1.25 },
              px: { xs: 2.5, md: 3 },
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 600,
              textTransform: 'uppercase',
              borderRadius: 1,
              boxShadow: (theme) => theme.customShadows.success,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.customShadows.z16,
              },
              '&:disabled': {
                backgroundColor: 'grey.300',
                color: 'grey.500',
                transform: 'none',
                boxShadow: 'none',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Suivant {selectedCount > 0 && `(${selectedCount})`}
          </Button>
        </Box>

        {/* Informations complémentaires */}
        {selectedCount > 0 && (
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
              variant="body2"
              sx={{
                color: 'info.dark',
                textAlign: 'center',
                fontSize: { xs: '0.8rem', md: '0.875rem' }
              }}
            >
              {selectedCount} activité{selectedCount > 1 ? 's' : ''} sélectionnée{selectedCount > 1 ? 's' : ''} •
              Vous serez redirigé vers le paiement
            </Typography>
          </Box>
        )}

        {/* Carousel des sponsors */}
        <Grid size={{ xs: 12 }}>
          <IntervenantCarousel />
        </Grid>

        {/* Footer */}
        <Footer />
      </Box>
    </DashboardContent>
  );
}