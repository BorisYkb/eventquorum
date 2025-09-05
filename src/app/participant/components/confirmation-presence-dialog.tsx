//src/app/participant/components/confirmation-presence-dialog.tsx - VERSION CONFORME MAQUETTE
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { LoadingButton } from '@mui/lab';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    /** État d'ouverture du dialog */
    open: boolean;
    /** Fonction de fermeture du dialog */
    onClose: () => void;
};

/**
 * Dialog de confirmation de présence pour l'événement
 * Version conforme à la maquette fournie
 */
export function ConfirmationPresenceDialog({ open, onClose }: Props) {
    const router = useRouter();

    // États pour le mode de participation sélectionné
    const [selectedMode, setSelectedMode] = useState<'enligne' | 'enpresentiel' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    /**
     * Gestion de la sélection du mode de participation
     */
    const handleModeSelection = (mode: 'enligne' | 'enpresentiel') => {
        setSelectedMode(mode);
    };

    /**
     * Gestion de la confirmation de présence
     */
    const handleConfirmPresence = async () => {
        if (!selectedMode) return;

        setIsLoading(true);

        try {
            // Simulation d'un appel API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Fermeture du dialog
            onClose();

            // Affichage de l'alerte de succès
            setShowAlert(true);

            // Redirection après la notification vers la page d'ACCUEIL de la section
            setTimeout(() => {
                if (selectedMode === 'enligne') {
                    router.push(paths.participant.enligne.root);
                } else {
                    router.push(paths.participant.enpresentiel.root);
                }
            }, 1500);

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
            setSelectedMode(null);
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
                        maxWidth: 450,
                        position: 'relative'
                    }
                }}
            >
                {/* Bouton fermer - croix rouge */}
                <IconButton
                    onClick={handleClose}
                    disabled={isLoading}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        color: 'error.main',
                        backgroundColor: 'error.lighter',
                        width: 32,
                        height: 32,
                        border: '1px solid',
                        borderColor: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.light',
                        }
                    }}
                >
                    <Iconify icon="material-symbols:close" width={18} />
                </IconButton>

                <Box sx={{ textAlign: 'center', pt: 2 }}>
                    {/* Question principale */}
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 5,
                            fontWeight: 600,
                            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                            lineHeight: 1.3,
                            color: 'text.primary'
                        }}
                    >
                        Voulez-vous participer à l'évènement<br />
                        en ligne ou en présentiel ??
                    </Typography>

                    {/* Options de sélection avec radio buttons */}
                    <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="center"
                        sx={{ mb: 6 }}
                    >
                        {/* Option En ligne */}
                        <Box
                            onClick={() => handleModeSelection('enligne')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                p: 1,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <Radio
                                checked={selectedMode === 'enligne'}
                                value="enligne"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24
                                    },
                                    color: 'text.primary',
                                    '&.Mui-checked': {
                                        color: 'primary.main',
                                    }
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    fontWeight: selectedMode === 'enligne' ? 600 : 500,
                                    color: 'text.primary'
                                }}
                            >
                                En ligne
                            </Typography>
                        </Box>

                        {/* Option En présentiel */}
                        <Box
                            onClick={() => handleModeSelection('enpresentiel')}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                p: 1,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <Radio
                                checked={selectedMode === 'enpresentiel'}
                                value="enpresentiel"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24
                                    },
                                    color: 'text.primary',
                                    '&.Mui-checked': {
                                        color: 'primary.main',
                                    }
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    fontWeight: selectedMode === 'enpresentiel' ? 600 : 500,
                                    color: 'text.primary'
                                }}
                            >
                                En présentiel
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Boutons d'action */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: '100%', px: 2 }}
                    >
                        {/* Bouton Annuler - rouge */}
                        <Button
                            onClick={handleClose}
                            disabled={isLoading}
                            variant="text"
                            sx={{
                                color: 'error.main',
                                textTransform: 'none',
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: 'error.lighter',
                                },
                                '&:disabled': {
                                    color: 'grey.400',
                                }
                            }}
                        >
                            Annuler
                        </Button>

                        {/* Bouton Valider - vert */}
                        <LoadingButton
                            loading={isLoading}
                            onClick={handleConfirmPresence}
                            disabled={!selectedMode}
                            variant="text"
                            sx={{
                                color: 'success.main',
                                textTransform: 'none',
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: 'success.lighter',
                                },
                                '&:disabled': {
                                    color: 'grey.400',
                                },
                                '& .MuiLoadingButton-loadingIndicator': {
                                    color: 'success.main',
                                }
                            }}
                        >
                            Valider
                        </LoadingButton>
                    </Stack>
                </Box>
            </Dialog>

            {/* Alert de succès */}
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setShowAlert(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Confirmation enregistrée avec succès !
                </Alert>
            </Snackbar>
        </>
    );
}