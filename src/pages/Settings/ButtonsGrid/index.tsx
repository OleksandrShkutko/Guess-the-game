import { Grid, Button } from '@mui/material';

type ButtonGridProps = {
  handleResetSettings: () => void;
  handleResetScore: () => void;
  handleCancel: () => void;
};

const ButtonGrid = ({
  handleResetSettings,
  handleResetScore,
  handleCancel,
}: ButtonGridProps) => {
  return (
    <Grid
      position={'sticky'}
      container
      spacing={2}
      bottom={0}
      mt={4}
      sx={{
        width: '100%',
      }}
    >
      <Grid size={{ xs: 12, md: 6 }}>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            backgroundColor: 'background.paper',
            backgroundImage: 'var(--Paper-overlay)',
          }}
          onClick={handleResetSettings}
        >
          Reset Settings
        </Button>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            backgroundColor: 'background.paper',
            backgroundImage: 'var(--Paper-overlay)',
          }}
          onClick={handleResetScore}
        >
          Reset Score
        </Button>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            backgroundColor: 'background.paper',
            backgroundImage: 'var(--Paper-overlay)',
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Button variant='contained' fullWidth type='submit'>
          Save settings
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonGrid;
