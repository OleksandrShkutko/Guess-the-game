import { useContext } from 'react';
import { CardMedia, Box, CardActionArea } from '@mui/material';
import { GameContext } from '../../../Game';
import * as Image from '../../../../images';
import './GameImage.css';

type GameImageProps = {
  image: string;
};

const GameImage = ({ image }: GameImageProps) => {
  // Get data from GameContext
  const isCorrectAnswer = useContext(GameContext).isCorrectAnswer;
  const getNewGame = useContext(GameContext).getNewGame;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'calc(100% - 2px)',
        maxWidth: '600px',
        margin: 'auto',
        aspectRatio: '1 / 1',
        backgroundColor: '#202020',
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, .07)',
        borderRadius: '15px',
        border: '1px solid',
        borderColor: 'primary.main',
      }}
    >
      {isCorrectAnswer === false ? (
        <CardActionArea
          onClick={getNewGame}
          sx={{ width: '400px', maxWidth: '100%', background: 'none' }}
        >
          <Image.GameOver size='400' className='scale-element' />
        </CardActionArea>
      ) : (
        <CardMedia
          component='img'
          sx={{
            objectFit: 'contain',
            aspectRatio: '1 / 1',
            borderRadius: '15px',
          }}
          image={image}
        />
      )}
    </Box>
  );
};

export default GameImage;
