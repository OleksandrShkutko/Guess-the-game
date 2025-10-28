import { useContext } from 'react';
import { Grid } from '@mui/material';
import AnswerButton from '../AnswerButton';
import type { GamesNames } from '../../../../types';
import { GameContext } from '../..';

type ButtonGridProps = {
  gamesNames: GamesNames;
};

const GameButtonsGrid = ({ gamesNames }: ButtonGridProps) => {
  // Get data from GameContext
  const isCorrectAnswer = useContext(GameContext).isCorrectAnswer;

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      marginBottom={2}
      textAlign='center'
      sx={
        isCorrectAnswer !== null ? { pointerEvents: 'none', opacity: 0.6 } : {}
      }
    >
      {gamesNames.map((name, index) => (
        <Grid key={index} size={{ xs: 12, md: 6 }}>
          <AnswerButton>{name}</AnswerButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameButtonsGrid;
