import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeQiutDialog,
  setGameScoreResult,
  type StoreType,
} from '../../../../store';
import { useNavigate } from 'react-router-dom';

type QuitGameDialogProps = {
  score: number;
};

const QuitGameDialog = ({ score }: QuitGameDialogProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from the store
  const isQiutDialogOpen = useSelector(
    (state: StoreType) => state.qiutDialog.isQiutDialogOpen
  );

  // Handle dialog close
  const handleCloseQiutDialog = () => {
    dispatch(setGameScoreResult(score));
    dispatch(closeQiutDialog());
  };

  // Handle the game quit and navigate to the Home page
  const handleCloseAndNavigate = () => {
    handleCloseQiutDialog();
    navigate('/');
  };

  return (
    <Dialog
      open={isQiutDialogOpen}
      onClose={handleCloseQiutDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableRestoreFocus
    >
      <DialogTitle id='alert-dialog-title'>Quit the game?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to quit the game? Your current progress will be
          lost, but the score will be saved.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseQiutDialog}>
          Back
        </Button>
        <Button onClick={handleCloseAndNavigate} color='error'>
          Quit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuitGameDialog;
