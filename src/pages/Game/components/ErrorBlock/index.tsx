import { Button, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

type ErrorBlockProps = {
  error: string | null;
  getNewGame: () => void;
};

const ErrorBlock = ({ error, getNewGame }: ErrorBlockProps) => {
  return (
    <>
      <Typography variant='h6' color='error' align='center'>
        Ops somemething went wrong! Please try again, or try to change settings.
      </Typography>
      <Typography variant='body1' color='textSecondary' align='center'>
        {error || 'An unexpected error occurred.'}
      </Typography>

      <Button
        sx={{ mt: 2 }}
        variant='contained'
        color='primary'
        onClick={getNewGame}
      >
        Try again
      </Button>
      <Stack sx={{ mt: 2 }} spacing={2} direction={'row'}>
        <Link to='/settings'>
          <Button variant='outlined' color='primary'>
            Settings
          </Button>
        </Link>
        <Link to='/'>
          <Button variant='outlined' color='primary'>
            Home Page
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default ErrorBlock;
