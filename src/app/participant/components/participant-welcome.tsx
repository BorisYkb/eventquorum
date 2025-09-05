//src/app/participant/components/participant-welcome.tsx
import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
};

/**
 * Composant Welcome spécialement adapté pour l'espace Participant
 * Corrige les problèmes de theme.vars.palette
 */
export function ParticipantWelcome({ 
  img, 
  title, 
  action, 
  description, 
  sx, 
  ...other 
}: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={[
        {
          display: 'flex',
          borderRadius: 2,
          position: 'relative',
          color: 'common.white',
          ...theme.mixins.bgGradient({
            images: [
              // Gradient simple sans varAlpha
              `linear-gradient(to right, ${theme.palette.grey[900]} 25%, ${theme.palette.primary.main})`,
              `url(${CONFIG.assetsDir}/assets/background/background-6.webp)`,
            ],
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            whiteSpace: 'pre-line',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            opacity: 0.9,
            maxWidth: 480,
            mb: { xs: 3, md: 5 },
            fontSize: { xs: '0.875rem', md: '1rem' },
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>

        {action && (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
            {action}
          </Box>
        )}
      </Box>

      {img && (
        <Box
          sx={{
            maxWidth: 260,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'flex-end',
            position: 'relative',
            justifyContent: 'center',
            p: { xs: 0, md: 2 }
          }}
        >
          {img}
        </Box>
      )}
    </Box>
  );
}