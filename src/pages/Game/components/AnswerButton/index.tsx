import { useEffect, useState, useContext } from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import type { ButtonColor } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer, type StoreType } from '../../../../store';
import { GameContext } from '../..';

type AnswerButtonProps = {
  children: string;
};

const AnswerButton = ({ children }: AnswerButtonProps) => {
  const dispatch = useDispatch();

  const [buttonColor, setButtonColor] = useState<ButtonColor>('primary');

  // Get data from GameContext
  const disabled =
    useContext(GameContext).isCorrectAnswer !== null ? true : false;

  // Get data from the store
  const rightAnsver = useSelector(
    (state: StoreType) => state.gameButtonsGrid.rightAnswer
  );
  const answer = useSelector(
    (state: StoreType) => state.gameButtonsGrid.answer
  );

  // Update button color if answer is already selected
  useEffect(() => {
    if (answer) {
      if (children === rightAnsver) {
        setButtonColor('success');
      }
    }
  }, [answer]);

  // Handle button click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isCorrect = rightAnsver === e.currentTarget.name;
    setButtonColor(isCorrect ? 'success' : 'error');
    dispatch(setAnswer(e.currentTarget.name));
  };

  return (
    <Tooltip title={children} arrow enterDelay={500} enterNextDelay={500}>
      <Button
        sx={{
          whiteSpace: 'nowrap',
          maxWidth: '500px',
          '&.Mui-disabled': {
            color: `${buttonColor}.contrastText`,
            backgroundColor: `${buttonColor}.main`,
          },
        }}
        name={children}
        fullWidth
        variant='contained'
        onClick={handleClick}
        color={buttonColor}
        disabled={disabled}
      >
        <Typography
          noWrap
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {children}
        </Typography>
      </Button>
    </Tooltip>
  );
};

export default AnswerButton;
