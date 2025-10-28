import { Card } from '@mui/material';
import type { Game, GamesNames } from '../../../../types';
import GameImage from '../GameImage';
import GameButtonsGrid from '../GameButtonsGrid';

type GameBlockProps = {
  gameInfo: Game;
  gamesNames: GamesNames;
};

const GameBlock = ({ gameInfo, gamesNames }: GameBlockProps) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: '100%',
        maxWidth: 900,
        boxShadow: 'none',
        paddingBlock: 0,
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      }}
    >
      <GameImage image={gameInfo.background_image} />
      <GameButtonsGrid gamesNames={gamesNames} />
    </Card>
  );
};

export default GameBlock;
