import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotEnoughGames = () => {
  return (
    <>
      <Typography variant='h6' color='error' align='center' sx={{ mt: 4 }}>
        Not enough games found with the selected settings. Please try different
        filters.
      </Typography>
      <Link to='/settings'>
        <Button variant='contained' color='primary' sx={{ mt: 2 }}>
          Settings
        </Button>
      </Link>
    </>
  );
};

export default NotEnoughGames;
