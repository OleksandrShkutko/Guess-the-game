import { Typography } from '@mui/material';

type GamePageProps = {
  score: number;
};

const GameScore = ({ score }: GamePageProps) => {
  return (
    <Typography variant='h4' component='h4' color='primary' align='center'>
      Game Score {score}
    </Typography>
  );
};

export default GameScore;
