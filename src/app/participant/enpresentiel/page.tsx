//src/app/participant/enpresentiel/page.tsx - VERSION APRÈS PAIEMENT
'use client';

import { useState, useEffect } from 'react';
import { useParticipantStatus } from 'src/contexts/participant-context';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
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

import { DashboardContent } from 'src/layouts/participant';
import { MotivationIllustration } from 'src/assets/illustrations';

import { useMockedUser } from 'src/auth/hooks';

import { Iconify } from 'src/components/iconify';

import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';
import { SurveyCodeDialog } from 'src/app/participant/components/survey-code-dialog';
import { ParticipantWelcome } from '../components/participant-welcome';

// ----------------------------------------------------------------------

/**
 * Données fictives du programme SARA 2023 avec informations étendues après paiement
 */
const programmeDataAfterPayment = [
    {
        id: '1',
        time: '08H00',
        title: 'OUVERTURE DU SALON ET DU SARA MARKET AU PUBLIC',
        status: 'Terminé',
        statusColor: 'error' as const,
        description: `Sous la présidence de S.E.M Alassane OUATTARA, à la salle plénière du site du SARA.
        Rendez-vous mit sur scène chefrésentatrices et sur des feuilles par le président de la République.`,
        documents: ['Document_1'],
        hasDocument: true,
        canDownload: true,
    },
    {
        id: '2',
        time: '12H00',
        title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        status: 'En cours',
        statusColor: 'warning' as const,
        description: 'Cérémonie officielle d\'ouverture du SARA 2023 avec la participation des personnalités officielles.',
        documents: [],
        hasDocument: false,
        canDownload: false,
    },
    {
        id: '3',
        time: '14H00',
        title: 'POINT DE PRESSE (SALLE DE CONFÉRENCE)',
        status: '',
        statusColor: 'default' as const,
        description: 'Point de presse avec les journalistes et les médias nationaux et internationaux.',
        documents: [],
        hasDocument: false,
        canDownload: false,
    },
    {
        id: '4',
        time: '14H00',
        title: 'PANEL DE HAUT NIVEAU (LES ASSISES DU SARA 2023)',
        status: 'En cours',
        statusColor: 'success' as const,
        description: 'Panel de haut niveau sur les enjeux agricoles et les perspectives d\'avenir.',
        documents: [],
        hasDocument: false,
        canDownload: false,
    },
    {
        id: '5',
        time: '15H00',
        title: 'VERNISSAGE DU SALON ET DU SARA MARKET AU PUBLIC',
        status: '',
        statusColor: 'default' as const,
        description: 'Vernissage officiel du salon avec présentation des exposants.',
        documents: [],
        hasDocument: false,
        canDownload: false,
    },
    {
        id: '6',
        time: '21H00',
        title: 'NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)',
        status: 'En cours',
        statusColor: 'success' as const,
        description: 'Soirée culturelle avec concerts et animations au SARA Village.',
        documents: [],
        hasDocument: false,
        canDownload: false,
    }
];

// ----------------------------------------------------------------------

/**
 * Vue d'accueil pour l'espace Participant en présentiel APRÈS PAIEMENT
 * Interface enrichie avec nouvelles fonctionnalités pour les participants ayant payé
 */
export default function Page() {
    const { status, updateStatus } = useParticipantStatus();
    const theme = useTheme();
    const { user } = useMockedUser();

    const [isMobile, setIsMobile] = useState(false);
    const [openSurveyDialog, setOpenSurveyDialog] = useState(false);

    // Mise à jour automatique du contexte si on est sur cette page
    useEffect(() => {
        if (!status.hasConfirmedPresence) {
            updateStatus({
                hasConfirmedPresence: true,
                participationType: 'enpresentiel',
                currentSection: 'enpresentiel'
            });
        }
    }, [status.hasConfirmedPresence, updateStatus]);

    // Hook pour détecter la taille d'écran côté client
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Composant d'informations pratiques avec informations étendues après paiement
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
                        Du 24 sept. au 08 oct.
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
     * Gestion du téléchargement de document
     */
    const handleDownloadDocument = (documentName: string) => {
        // Simulation du téléchargement
        console.log(`Téléchargement de: ${documentName}`);
        // Dans la vraie app, déclencher le téléchargement
        alert(`Téléchargement de ${documentName} démarré...`);
    };

    /**
     * Rendu de la section vidéo principale (inchangée)
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
     * Rendu de la section programme enrichie APRÈS PAIEMENT
     */
    const renderProgrammeSection = () => (
        <Card sx={{ borderRadius: { xs: 1, md: 2 }, overflow: 'hidden', height: 'fit-content' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'center', sm: 'center' }} sx={{ mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                            mb: { xs: 2, sm: 0 }
                        }}
                    >
                        PROGRAMME SARA 2023
                    </Typography>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                        
                        {/* Bouton "Partager un avis" - APRÈS PAIEMENT */}
                        {status.hasPaidActivities && (
                            <Button
                                variant="contained"
                                size="small"
                                color="warning"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    fontWeight: 600,
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1
                                }}
                                onClick={() => {
                                    // Redirection vers l'onglet Avis de Mes Interactions
                                    window.location.href = '/participant/enpresentiel/mesinteractions?tab=reviews';
                                }}
                            >
                                Partager un avis
                            </Button>
                        )}
                    </Stack>
                </Stack>

                <Box>
                    {programmeDataAfterPayment.map((item, index) => (
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
                                //     borderColor: 'primary.main',
                                //     backgroundColor: 'primary.lighter',
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
                                <Stack spacing={2}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: { xs: '0.7rem', md: '0.875rem' }
                                        }}
                                    >
                                        Type d'activité: <strong>Atelier/Workshop</strong>
                                    </Typography>
                                    
                                    {/* Description étendue après paiement */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                                            lineHeight: { xs: 1.4, md: 1.5 }
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                    
                                    {/* Documents et téléchargements - APRÈS PAIEMENT */}
                                    {status.hasPaidActivities && item.hasDocument && item.documents.length > 0 && (
                                        <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                                            {item.documents.map((doc, docIndex) => (
                                                <Stack key={docIndex} direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ 
                                                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {doc}
                                                    </Typography>
                                                    {item.canDownload && (
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            color="inherit"
                                                            onClick={() => handleDownloadDocument(doc)}
                                                            sx={{
                                                                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                                                                textTransform: 'none',
                                                                minWidth: 'auto',
                                                                px: 1.5,
                                                                py: 0.5,
                                                                backgroundColor: 'white',
                                                                borderColor: 'grey.300',
                                                                color: 'text.primary',
                                                                '&:hover': {
                                                                    borderColor: 'grey.500',
                                                                    backgroundColor: 'grey.50',
                                                                }
                                                            }}
                                                        >
                                                            Télécharger
                                                        </Button>
                                                    )}
                                                </Stack>
                                            ))}
                                        </Box>
                                    )}

                                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                        {!item.hasDocument && (
                                            <Button
                                                size="small"
                                                startIcon={<Iconify icon="solar:document-text-bold" />}
                                                sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                                            >
                                                Document
                                            </Button>
                                        )}
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

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3} sx={{ py: { xs: 2, md: 3 } }}>

                {/* 1. Section Welcome - Pleine largeur */}
                <Grid size={{ xs: 12 }}>
                    <ParticipantWelcome
                        title={`Bonjours cher participant ${user?.displayName || ''}`}
                        description="Vous participez à l'événement en présentiel. Votre paiement a été confirmé et votre badge est disponible."
                        img={<MotivationIllustration hideBackground />}
                        // Action dynamique après paiement - Bouton "Je participe à une enquête"
                        action={status.hasPaidActivities && (
                            <Button
                                variant="contained"
                                size={isMobile ? 'medium' : 'large'}
                                color="info"
                                startIcon={<Iconify icon="solar:clipboard-list-bold" />}
                                onClick={() => setOpenSurveyDialog(true)}
                                sx={{
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    color: 'success',
                                    px: { xs: 2, md: 3 },
                                    py: { xs: 1, md: 1.5 },
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    backgroundColor: 'info.main',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: (theme) => theme.customShadows.z16,
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Je participe à une enquête
                            </Button>
                        )}
                    />
                </Grid>

                {/* 2. Ligne Vidéo + Informations pratiques */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {renderVideoSection()}
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    {renderInformationsPratiques()}
                </Grid>

                {/* 3. Ligne Programme enrichi - Pleine largeur */}
                <Grid size={{ xs: 12 }}>
                    {renderProgrammeSection()}
                </Grid>

                {/* 4. Carousel des sponsors - Pleine largeur */}
                <Grid size={{ xs: 12 }}>
                    <IntervenantCarousel />
                </Grid>

                {/* 5. Footer - Pleine largeur */}
                <Footer />
            </Grid>

            {/* Dialog de saisie de code d'enquête */}
            <SurveyCodeDialog 
                open={openSurveyDialog} 
                onClose={() => setOpenSurveyDialog(false)} 
            />
        </DashboardContent>
    );
}