import React, { useState } from 'react';
import {
  Button,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent
} from '@material-ui/core';

interface Props {}

const DeleteProfile: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  //   Make dialog responsive
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {};
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
        fullScreen={fullscreen}
        open={open}
        aria-labelledby="delete-account-dialog-title"
      >
        <DialogTitle id="delete-account-dialog-title">
          Permenently Delete Account
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}></form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProfile;
