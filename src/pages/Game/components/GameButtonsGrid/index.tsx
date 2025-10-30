import { Grid } from '@mui/material';
import AnswerButton from '../AnswerButton';
import type { GamesNames } from '../../../../types';

type ButtonGridProps = {
  gamesNames: GamesNames;
};

const GameButtonsGrid = ({ gamesNames }: ButtonGridProps) => {
  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      marginBottom={2}
      textAlign='center'
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
