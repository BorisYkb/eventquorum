//src/app/participant/components/payment-method-dialog.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

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
 * Dialog pour choisir le mode de paiement
 * Propose paiement mobile money ou au guichet
 */
export function PaymentMethodDialog({ open, onClose }: Props) {
  const router = useRouter();
  const { updateStatus } = useParticipantStatus();
  
  // État pour le mode de paiement sélectionné
  const [selectedMethod, setSelectedMethod] = useState<'mobile' | 'guichet' | null>(null);
  const [showGuichetMessage, setShowGuichetMessage] = useState(false);

  /**
   * Gestion de la sélection du mode de paiement
   */
  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value as 'mobile' | 'guichet');
  };

  /**
   * Gestion de la validation du mode de paiement
   */
  const handleValidate = () => {
    if (!selectedMethod) return;

    if (selectedMethod === 'mobile') {
      // Redirection vers la page de paiement mobile money
      onClose();
      router.push('/participant/enpresentiel/paiement');
    } else if (selectedMethod === 'guichet') {
      // Afficher le message de guichet
      setShowGuichetMessage(true);
    }
  };

  /**
   * Gestion de la fermeture du message guichet et redirection
   */
  const handleGuichetOk = () => {
    // Mise à jour du statut : paiement effectué au guichet
    updateStatus({
      hasPaidActivities: true
    });
    
    setShowGuichetMessage(false);
    onClose();
    
    // Redirection vers la page d'accueil enpresentiel
    router.push('/participant/enpresentiel');
  };

  /**
   * Gestion de la fermeture générale
   */
  const handleClose = () => {
    if (!showGuichetMessage) {
      setSelectedMethod(null);
      onClose();
    }
  };

  // Affichage du message de guichet
  if (showGuichetMessage) {
    return (
      <Dialog
        open={open}
        onClose={() => {}} // Empêcher la fermeture pendant le message
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, p: 3 } }}
      >
        <Box sx={{ textAlign: 'center' }}>
          {/* Bouton fermer */}
          <IconButton
            onClick={handleGuichetOk}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'error.main'
            }}
          >
            <Iconify icon="material-symbols:close" />
          </IconButton>

          {/* Message */}
          <Box sx={{ mt: 2, mb: 4 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                lineHeight: 1.6,
                fontSize: '1rem',
                fontWeight: 400
              }}
            >
              Parfait, rapprochez-vous d'une hôtesse qui vous guidera vers le guichet de paiement.
              <br />
              Merci de préparer la monnaie.
            </Typography>
          </Box>

          {/* Bouton OK */}
          <Button
            variant="contained"
            color="success"
            onClick={handleGuichetOk}
            sx={{
              minWidth: 80,
              textTransform: 'uppercase',
              fontWeight: 600,
              borderRadius: 1
            }}
          >
            OK
          </Button>
        </Box>
      </Dialog>
    );
  }

  // Affichage du dialog principal de choix
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, p: 3 } }}
    >
      <Box>
        {/* Bouton fermer */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'error.main'
          }}
        >
          <Iconify icon="material-symbols:close" />
        </IconButton>

        {/* Titre */}
        <Box sx={{ mb: 4, mt: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'error.main',
              fontWeight: 500,
              fontSize: '1.125rem'
            }}
          >
            Comment voulez-vous payer?
          </Typography>
        </Box>

        {/* Options de paiement */}
        <Box sx={{ mb: 4 }}>
          <RadioGroup
            value={selectedMethod || ''}
            onChange={handleMethodChange}
          >
            <FormControlLabel
              value="mobile"
              control={
                <Radio 
                  sx={{
                    color: 'text.primary',
                    '&.Mui-checked': { color: 'primary.main' }
                  }}
                />
              }
              label={
                <Typography 
                  sx={{ 
                    color: 'text.primary',
                    fontSize: '1rem',
                    fontWeight: 400
                  }}
                >
                  Via mon mobile money
                </Typography>
              }
              sx={{ mb: 2 }}
            />
            
            <FormControlLabel
              value="guichet"
              control={
                <Radio 
                  sx={{
                    color: 'text.primary',
                    '&.Mui-checked': { color: 'primary.main' }
                  }}
                />
              }
              label={
                <Typography 
                  sx={{ 
                    color: 'text.primary',
                    fontSize: '1rem',
                    fontWeight: 400
                  }}
                >
                  Via le guichet de paiement
                </Typography>
              }
            />
          </RadioGroup>
        </Box>

        {/* Bouton Valider */}
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleValidate}
            disabled={!selectedMethod}
            sx={{
              minWidth: 100,
              textTransform: 'uppercase',
              fontWeight: 600,
              borderRadius: 1,
              '&:disabled': {
                backgroundColor: 'grey.300',
                color: 'grey.500'
              }
            }}
          >
            Valider
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}