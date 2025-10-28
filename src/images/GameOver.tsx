import gameOver from '/game_over.png';

const GameOver = ({ className = '', size = '100%' }) => {
  return (
    <img
      src={gameOver}
      alt='Game Over'
      className={className}
      width={size}
      style={{ maxWidth: '100%' }}
    />
  );
};

export default GameOver;
