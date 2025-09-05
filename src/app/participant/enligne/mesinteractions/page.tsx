//src/app/participant/enligne/mesinteractions/page.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';

// Import du composant de statistiques
import { GuichetWidgetSummary } from 'src/app/participant/components/guichet-widget-summary-2';

// Import de la section Avis
import { ReviewsSection } from '../../components/reviews-section';

// ----------------------------------------------------------------------

/**
 * Données fictives pour les statistiques des interactions en ligne
 */
const INTERACTION_STATS = [
    {
        title: 'Sessions rejointes',
        total: '03',
        color: 'success' as const,
        icon: 'solar:videocamera-record-bold-duotone',
    },
    {
        title: 'Messages envoyés',
        total: '24',
        color: 'info' as const,
        icon: 'solar:chat-round-bold-duotone',
    },
    {
        title: 'Questions posées',
        total: '05',
        color: 'warning' as const,
        icon: 'solar:question-circle-bold-duotone',
    },
];

/**
 * Données fictives pour le tableau des interactions
 */
const INTERACTION_DATA = [
    {
        id: 1,
        title: 'PANEL DE HAUT NIVEAU - WEBINAIRE',
        type: 'Chat en direct',
        date: '10/09/2024 10H00',
        status: 'Actif',
        statusColor: 'success',
        interaction: 'Messages: 12 • Questions: 2',
        participants: '156 participants',
    },
    {
        id: 2,
        title: 'ATELIER INTERACTIF - Q&A',
        type: 'Questions/Réponses',
        date: '10/09/2024 14H00',
        status: 'Terminé',
        statusColor: 'info',
        interaction: 'Questions: 3 • Likes: 8',
        participants: '89 participants',
    },
    {
        id: 3,
        title: 'NETWORKING VIRTUEL',
        type: 'Discussion de groupe',
        date: '11/09/2024 12H00',
        status: 'À venir',
        statusColor: 'warning',
        interaction: 'Connexions: 5',
        participants: '203 participants',
    },
    {
        id: 4,
        title: 'SESSION PLÉNIÈRE',
        type: 'Sondage en direct',
        date: '11/09/2024 16H00',
        status: 'À venir',
        statusColor: 'warning',
        interaction: 'Votes: 0',
        participants: '324 participants',
    },
];

/**
 * Configuration des onglets disponibles pour les interactions en ligne
 */
const TABS_CONFIG = [
    {
        value: 'interactions',
        label: 'Mes Interactions',
        icon: 'solar:users-group-rounded-bold-duotone',
    },
    {
        value: 'reviews',
        label: 'Avis',
        icon: 'solar:star-bold-duotone',
    },
];

// ----------------------------------------------------------------------

/**
 * Composant principal de la page Mes Interactions pour la participation en ligne
 * Interface similaire à la version présentiel mais adaptée aux interactions virtuelles
 * 
 * @returns JSX.Element - Interface complète des interactions participant en ligne
 */
export default function MesInteractionsEnlignePage() {
    // Gestion de l'onglet actif
    const [currentTab, setCurrentTab] = useState('interactions');

    // Gestion de la recherche
    const [searchQuery, setSearchQuery] = useState('');

    // Hooks pour la responsivité
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /**
     * Gestionnaire de changement d'onglet
     */
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    /**
     * Gestionnaire de changement de recherche
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    /**
     * Filtrage des données selon la recherche
     */
    const filteredData = INTERACTION_DATA.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Rendu des statistiques sous forme de cartes widget
     */
    const renderStats = () => (
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
            {INTERACTION_STATS.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <GuichetWidgetSummary
                        title={stat.title}
                        total={stat.total}
                        color={stat.color}
                        icon={stat.icon}
                        sx={{
                            '& .MuiTypography-h3': {
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                            },
                            '& .MuiTypography-subtitle2': {
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            },
                        }}
                    />
                </Grid>
            ))}
        </Grid>
    );

    /**
     * Rendu de la barre de recherche
     */
    const renderSearchBar = () => (
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
            <TextField
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Recherche dans vos interactions"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify
                                icon="solar:magnifer-linear"
                                sx={{
                                    color: 'text.disabled',
                                    width: { xs: 18, sm: 20 },
                                    height: { xs: 18, sm: 20 },
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    maxWidth: { xs: '100%', sm: '400px' },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: { xs: 1, sm: 1.5 },
                        backgroundColor: 'background.paper',
                        '&:hover': {
                            '& > fieldset': { borderColor: 'success.main' },
                        },
                    },
                }}
            />
        </Box>
    );

    /**
     * Rendu de l'en-tête du tableau
     */
    const renderTableHeader = () => (
        <TableHead>
            <TableRow>
                <TableCell sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    Session
                </TableCell>
                <TableCell sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    Date
                </TableCell>
                {!isSmallMobile && (
                    <TableCell sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        py: { xs: 1, sm: 1.5 },
                    }}>
                        Type d'interaction
                    </TableCell>
                )}
                <TableCell sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    Statut
                </TableCell>
                <TableCell sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    Activité
                </TableCell>
                <TableCell sx={{
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 1, sm: 1.5 },
                }}>
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );

    /**
     * Rendu d'une ligne du tableau avec les données d'interaction
     */
    const renderTableRow = (interaction: typeof INTERACTION_DATA[0]) => (
        <TableRow key={interaction.id} hover>
            <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            mb: 0.5,
                        }}
                    >
                        {interaction.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    >
                        {interaction.participants}
                    </Typography>
                </Box>
            </TableCell>

            <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                >
                    {interaction.date}
                </Typography>
            </TableCell>

            {!isSmallMobile && (
                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    >
                        {interaction.type}
                    </Typography>
                </TableCell>
            )}

            <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                <Label
                    color={interaction.statusColor as any}
                    variant="soft"
                    sx={{
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        px: 1,
                    }}
                >
                    {interaction.status}
                </Label>
            </TableCell>

            <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        color: 'success.main',
                        fontWeight: 500,
                    }}
                >
                    {interaction.interaction}
                </Typography>
            </TableCell>

            <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    {interaction.status === 'Actif' && (
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<Iconify icon="solar:videocamera-record-bold" />}
                            sx={{
                                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                px: 1,
                                py: 0.5,
                            }}
                        >
                            Rejoindre
                        </Button>
                    )}
                    <IconButton
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main' },
                        }}
                    >
                        <Iconify icon="solar:eye-bold-duotone" />
                    </IconButton>
                    <IconButton
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'success.main' },
                        }}
                    >
                        <Iconify icon="solar:download-bold-duotone" />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );

    /**
     * Rendu du tableau complet des interactions
     */
    const renderTable = () => (
        <Card sx={{ overflow: 'hidden' }}>
            <TableContainer>
                <Table size={isMobile ? 'small' : 'medium'}>
                    {renderTableHeader()}
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map(renderTableRow)
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Aucun résultat trouvé pour "{searchQuery}"
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );

    /**
     * Rendu du contenu selon l'onglet actif
     */
    const renderTabContent = () => {
        switch (currentTab) {
            case 'interactions':
                return (
                    <Box>
                        {renderStats()}
                        {renderSearchBar()}
                        {renderTable()}
                    </Box>
                );
            case 'reviews':
                return (
                    <ReviewsSection />
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {/* En-tête de la page */}
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        color: 'text.primary',
                        mb: 1,
                    }}
                >
                    Mes Interactions En Ligne
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                >
                    Gérez vos interactions virtuelles, chats en direct et participations aux sessions
                </Typography>
            </Box>

            {/* Navigation par onglets */}
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <CustomTabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant={isMobile ? 'scrollable' : 'standard'}
                    sx={{
                        borderRadius: 1,
                        '& .MuiTab-root': {
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            fontWeight: 600,
                            textTransform: 'none',
                            minHeight: { xs: '40px', sm: '48px' },
                            px: { xs: 2, sm: 3 },
                        },
                    }}
                >
                    {TABS_CONFIG.map((tab) => (
                        <Tab
                            key={tab.value}
                            value={tab.value}
                            label={tab.label}
                            icon={
                                <Iconify
                                    icon={tab.icon}
                                    sx={{
                                        mr: 1,
                                        width: { xs: 18, sm: 20 },
                                        height: { xs: 18, sm: 20 },
                                    }}
                                />
                            }
                            iconPosition="start"
                        />
                    ))}
                </CustomTabs>
            </Box>

            {/* Contenu de l'onglet actif */}
            {renderTabContent()}
        </Box>
    );
}