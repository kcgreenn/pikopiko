import React, { useState, useContext } from 'react';
import {
  Button,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { axiosInstance } from '../../App';
import { authContext } from '../../context/auth/AuthProvider';

interface Props {}

const DeleteProfile: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ delete: '' });
  const authCtxt = useContext(authContext);
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
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (deleteData.delete === 'DELETE') {
      // send delete request
      await axiosInstance.delete('/api/user');
      authCtxt.logout();
    }
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
              label="Type DELETE To Confirm"
              id="delete-confirm"
              name="delete"
              value={deleteData.delete}
              type="text"
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProfile;
