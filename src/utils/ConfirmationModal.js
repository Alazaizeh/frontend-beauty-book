import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, message, isLoading }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DialogActions>
          <Button variant="contained" onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmationModal;
