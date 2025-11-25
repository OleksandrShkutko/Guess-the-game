import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { type OverridableStringUnion } from '@mui/types';
import { closeSettingsDialog, type StoreType } from '../../../store';

type DialogProps = {
  dialogProps: {
    title?: string;
    text?: string;
    confirmButton?: {
      text: string;
      color?: OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
      >;
      event?: () => void;
    };
  };
};

const SettingsDialog = ({
  dialogProps: {
    title = 'Are you shure?',
    text = '',
    confirmButton = { text: 'Quit' },
  },
}: DialogProps) => {
  const dispatch = useDispatch();

  // Get data from the store
  const isSettingsDialogOpen = useSelector(
    (state: StoreType) => state.settings.isSettingsDialogOpen
  );

  // Handle dialog close
  const handleCloseQiutDialog = () => {
    dispatch(closeSettingsDialog());
  };

  return (
    <Dialog
      open={isSettingsDialogOpen}
      onClose={handleCloseQiutDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableRestoreFocus
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseQiutDialog}>
          Back
        </Button>
        <Button
          onClick={confirmButton.event || handleCloseQiutDialog}
          color={confirmButton.color}
        >
          {confirmButton.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
