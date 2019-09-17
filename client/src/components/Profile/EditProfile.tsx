import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Button,
  Dialog,
  useMediaQuery,
  useTheme,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { axiosInstance } from '../../App';

interface Props {
  bio: string;
  interests: string;
  updateProfile: any;
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '360px',
    width: '100vw',
  },
}));

const EditProfile: React.FC<Props> = ({ bio, interests, updateProfile }) => {
  const classes = useStyles();

  // make dialog responsive
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [profileData, setProfileData] = useState({
    bio: '',
    interests: '',
  });
  useEffect(() => {
    setProfileData({
      bio,
      interests,
    });
  }, [bio, interests]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.currentTarget.name;
    const value = e.currentTarget.value;
    setProfileData({
      ...profileData,
      [target]: value,
    });
  };
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      // dispatch update profile request
      const res = await axiosInstance.patch('/api/profile', profileData);
      updateProfile(res.data);
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Edit Profile
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="edit-profile-title"
      >
        <DialogTitle id="edit-profile-title">Edit Profile</DialogTitle>
        <DialogContent style={{ minWidth: '350px' }}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              id="editBio"
              label="Bio"
              name="bio"
              type="text"
              fullWidth
              value={profileData.bio}
              onChange={handleInputChange}
              multiline
              rows={5}
            />
            <DialogActions>
              <Button type="submit" onClick={handleClose} color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
