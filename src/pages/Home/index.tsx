import { Button, Stack, Typography } from '@mui/material';
import CenteredContainer from '../../components/Container';
import * as Image from '../../images';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type StoreType } from '../../store';

const Home = () => {
  // Get best session score from the store
  const bestSessionScore = useSelector(
    (state: StoreType) => state.gameScore.bestGameScore
  );

  // Component states
  const [startGameLoading, setStartGameLoading] = useState(false);

  // Handle Start Game button click
  const handleStartGameClick = () => {
    setStartGameLoading(true);
  };

  return (
    <CenteredContainer>
      <Image.Logo className='logo' size={300} />
      <Typography variant='h5' align='center' color='primary' mt={2} mb={6}>
        Best Session Score: {bestSessionScore}
      </Typography>
      <Stack spacing={2} direction={'column'} alignItems='center'>
        <Link to='/game'>
          <Button
            variant='contained'
            loading={startGameLoading}
            onClick={handleStartGameClick}
          >
            Start Game
          </Button>
        </Link>
        <Link to='/settings'>
          <Button variant='outlined'>Settings</Button>
        </Link>
      </Stack>
    </CenteredContainer>
  );
};

export default Home;
