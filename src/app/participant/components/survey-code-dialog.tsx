//src/app/participant/components/survey-code-dialog.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    /** État d'ouverture du dialog */
    open: boolean;
    /** Fonction de fermeture du dialog */
    onClose: () => void;
};

/**
 * Dialog pour saisir le code d'une enquête de satisfaction
 * Permet au participant de rejoindre une enquête spécifique
 */
export function SurveyCodeDialog({ open, onClose }: Props) {
    const router = useRouter();
    const theme = useTheme();

    // États pour le code d'enquête
    const [surveyCode, setSurveyCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Validation et participation à l'enquête
     */
    const handleParticiper = async () => {
        if (!surveyCode.trim()) {
            setError('Veuillez saisir un code d\'enquête');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Simulation d'une vérification du code
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validation du code (simulation)
            if (surveyCode.toUpperCase() === 'AZ123' || surveyCode.length >= 3) {
                // Code valide - redirection vers l'enquête
                onClose();
                router.push(`/participant/enquete?code=${surveyCode.toUpperCase()}`);
            } else {
                setError('Code d\'enquête invalide');
            }
        } catch (err) {
            setError('Erreur lors de la vérification du code');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Annulation et fermeture
     */
    const handleAnnuler = () => {
        setSurveyCode('');
        setError('');
        onClose();
    };

    /**
     * Gestion de l'entrée clavier
     */
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleParticiper();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleAnnuler}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxWidth: 400,
                    m: 2
                }
            }}
        >
            <Box sx={{ p: 3, position: 'relative' }}>
                {/* Bouton fermer */}
                <IconButton
                    onClick={handleAnnuler}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'error.main'
                    }}
                >
                    <Iconify icon="material-symbols:close" />
                </IconButton>

                {/* En-tête */}
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: 'text.primary',
                            fontSize: { xs: '1rem', md: '1.125rem' }
                        }}
                    >
                        Satisfaction des intervenants
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            fontSize: { xs: '1.125rem', md: '1.25rem' }
                        }}
                    >
                        Renseigner le code de enquête
                    </Typography>
                </Box>

                {/* Champ de saisie du code */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', md: '0.9375rem' }
                        }}
                    >
                        Code
                    </Typography>

                    <TextField
                        fullWidth
                        value={surveyCode}
                        onChange={(e) => {
                            setSurveyCode(e.target.value.toUpperCase());
                            setError(''); // Effacer l'erreur lors de la saisie
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Ex: AZ123"
                        variant="outlined"
                        error={!!error}
                        helperText={error}
                        disabled={isLoading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                                backgroundColor: 'background.paper',
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                fontWeight: 500,
                                textAlign: 'center',
                                '& input': {
                                    textAlign: 'center',
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    fontWeight: 600,
                                    letterSpacing: '0.1em'
                                }
                            }
                        }}
                        inputProps={{
                            maxLength: 10,
                            style: { textTransform: 'uppercase' }
                        }}
                    />
                </Box>

                {/* Boutons d'action */}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleAnnuler}
                        disabled={isLoading}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            fontSize: { xs: '0.875rem', md: '0.9375rem' },
                            borderRadius: 1,
                            minWidth: 100
                        }}
                    >
                        Annuler
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleParticiper}
                        disabled={isLoading || !surveyCode.trim()}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            fontSize: { xs: '0.875rem', md: '0.9375rem' },
                            borderRadius: 1,
                            minWidth: 100,
                            '&:disabled': {
                                backgroundColor: 'grey.300',
                                color: 'grey.500'
                            }
                        }}
                    >
                        {isLoading ? 'Vérification...' : 'Participer'}
                    </Button>
                </Stack>

                {/* Information d'aide */}
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
                            fontSize: { xs: '0.75rem', md: '0.8125rem' },
                            display: 'block',
                            textAlign: 'center',
                            lineHeight: 1.4
                        }}
                    >
                        Le code d'enquête vous est communiqué par l'intervenant en charge de votre session.
                    </Typography>
                </Box>
            </Box>
        </Dialog>
    );
}