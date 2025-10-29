import { Button, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

type ErrorBlockProps = {
  error: string | null;
};

const ErrorBlock = ({ error }: ErrorBlockProps) => {
  return (
    <>
      <Typography variant='h6' color='error' align='center'>
        Ops somemething went wrong! Please try again later, or try to change
        settings.
      </Typography>
      <Typography variant='body1' color='textSecondary' align='center'>
        {error || 'An unexpected error occurred.'}
      </Typography>
      <Stack sx={{ mt: 2 }} spacing={2} direction={'row'}>
        <Link to='/settings'>
          <Button variant='outlined' color='primary'>
            Settings
          </Button>
        </Link>
        <Link to='/'>
          <Button variant='contained' color='primary'>
            Home Page
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default ErrorBlock;
