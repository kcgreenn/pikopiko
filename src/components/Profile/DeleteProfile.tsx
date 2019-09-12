import React, { useState } from 'react';
import {
  Button,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@material-ui/core';

interface Props {}

const DeleteProfile: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ password: '' });
  //   Make dialog responsive
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDeleteData({
      ...deleteData,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO send delete request
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleClickOpen}
        color="secondary"
        variant="contained"
      >
        Delete Account
      </Button>
      <Dialog
        onClose={handleClose}
        fullScreen={fullscreen}
        open={open}
        aria-labelledby="delete-account-dialog-title"
      >
        <DialogTitle id="delete-account-dialog-title">
          Permenently Delete Account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Confirm Password"
              id="delete-password"
              name="password"
              value={deleteData.password}
              type="password"
              onChange={handleInputChange}
            />
          </form>
          <DialogActions>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button fullWidth variant="contained" type="submit" color="primary">
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProfile;
