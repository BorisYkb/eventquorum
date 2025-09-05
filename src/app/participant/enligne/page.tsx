//src/app/participant/enligne/page.tsx - VERSION CORRIGÉE
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
        time: '21H00',
        title: 'NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)',
        status: 'En cours',
        statusColor: 'success' as const,
    }
];

// ----------------------------------------------------------------------

/**
 * Vue d'accueil pour la participation en ligne
 */
export default function Page() {
    const { status, updateStatus } = useParticipantStatus();
    const theme = useTheme();
    const { user } = useMockedUser();

    const [isMobile, setIsMobile] = useState(false);
    const [openSurveyDialog, setOpenSurveyDialog] = useState(false);

    // ✅ CORRECTION : Mise à jour du contexte uniquement une fois au montage
    useEffect(() => {
        // Vérifier si on est bien sur cette page et si le statut n'est pas déjà correct
        if (status.participationType !== 'enligne' || status.currentSection !== 'enligne') {
            updateStatus({
                hasConfirmedPresence: true,
                participationType: 'enligne',
                currentSection: 'enligne'
            });
        }
    }, []); // ✅ Tableau vide pour n'exécuter qu'une fois

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
                        🌐 Plateforme
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                        }}
                    >
                        Participation en ligne
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
                        backgroundColor: 'success.darker',
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
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'center', sm: 'center' }} sx={{ mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem' },
                            mb: { xs: 2, sm: 0 }
                        }}
                    >
                        PROGRAMME SARA 2023 - PARTICIPATION EN LIGNE
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                color: 'text.secondary'
                            }}
                        >
                            Du 29 sept. au 08 oct.
                        </Typography>

                        {/* Bouton "Partager un avis" - APRÈS Suivre en Direct */}
                        {status.hasPaidActivities && status.hasConfirmedLiveFollow && (
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
                                    window.location.href = '/participant/enligne/mesinteractions?tab=reviews';
                                }}
                            >
                                Partager un avis
                            </Button>
                        )}
                    </Stack>
                </Stack>

                <Box>
                    {programmeData.map((item, index) => (
                        <Accordion
                            key={item.id}
                            sx={{
                                '&:before': { display: 'none' },
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: '8px !important',
                                mb: 1,
                                '&.Mui-expanded': {
                                    borderColor: 'success.main',
                                    backgroundColor: 'success.lighter',
                                },
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
                                <Stack spacing={1}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: { xs: '0.7rem', md: '0.875rem' }
                                        }}
                                    >
                                        Type d'activité: <strong>Session en ligne</strong>
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                                            lineHeight: { xs: 1.4, md: 1.5 }
                                        }}
                                    >
                                        Session interactive en ligne avec possibilité de poser des questions,
                                        participer aux sondages et accéder aux ressources partagées en temps réel.
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
                                            color="success"
                                            startIcon={<Iconify icon="solar:videocamera-record-bold" />}
                                            sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                                        >
                                            Rejoindre la session
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
                        title={`Bienvenue en ligne ${user?.displayName || ''}`}
                        description="Vous participez à l'événement en ligne. Accédez aux sessions interactives, aux ressources et aux interactions en temps réel."
                        img={<MotivationIllustration hideBackground />}
                        // Action dynamique après "Suivre en Direct"
                        action={status.hasPaidActivities && status.hasConfirmedLiveFollow && (
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    variant="contained"
                                    size={isMobile ? 'medium' : 'large'}
                                    color="info"
                                    startIcon={<Iconify icon="solar:clipboard-list-bold" />}
                                    onClick={() => setOpenSurveyDialog(true)}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
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

                                <Button
                                    variant="outlined"
                                    size={isMobile ? 'medium' : 'large'}
                                    color="warning"
                                    startIcon={<Iconify icon="solar:star-bold" />}
                                    onClick={() => {
                                        window.location.href = '/participant/enligne/mesinteractions?tab=reviews';
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: { xs: 2, md: 3 },
                                        py: { xs: 1, md: 1.5 },
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        borderColor: 'warning.main',
                                        color: 'warning.main',
                                        '&:hover': {
                                            backgroundColor: 'warning.lighter',
                                            borderColor: 'warning.dark',
                                            transform: 'translateY(-1px)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Partager un avis
                                </Button>
                            </Stack>
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
            </Grid>

            {/* Dialog de saisie de code d'enquête */}
            <SurveyCodeDialog
                open={openSurveyDialog}
                onClose={() => setOpenSurveyDialog(false)}
            />
        </DashboardContent>
    );
}