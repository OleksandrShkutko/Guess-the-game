import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Stack } from '@mui/material';
import { openQiutDialog } from '../../../../store';
import { GameContext } from '../../../Game';

const BottomButtons = () => {
  const dispatch = useDispatch();

  // Get data from GameContext
  const isCorrectAnswer = useContext(GameContext).isCorrectAnswer;
  const getNewGame = useContext(GameContext).getNewGame;

  // Handle Quit Game button click
  const handleClickQuitGame = () => {
    dispatch(openQiutDialog());
  };

  return (
    <>
      {isCorrectAnswer ? (
        <Button variant='outlined' onClick={getNewGame}>
          Next Game
        </Button>
      ) : typeof isCorrectAnswer === 'boolean' ? (
        <Stack spacing={2} direction='row'>
          <Link to='/'>
            <Button variant='outlined'>Go to Home Page</Button>
          </Link>
          <Button variant='contained' onClick={getNewGame}>
            New Game
          </Button>
        </Stack>
      ) : (
        <Button variant='outlined' onClick={handleClickQuitGame}>
          Quit Game
        </Button>
      )}
    </>
  );
};

export default BottomButtons;
