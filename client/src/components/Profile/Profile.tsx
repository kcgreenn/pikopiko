import React from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  Divider,
  List,
  ListItem,
  ListSubheader,
  Button
} from '@material-ui/core';
import SideDrawer from '../Layout/SideDrawer';
import Header from '../Layout/Header';
import { Link as RouterLink } from 'react-router-dom';
import DeleteProfile from './DeleteProfile';

// TODO add profile props
interface Props {}

const dtDrawerWidth = 240;
const mobDrawerWidth = 60;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '80vh',
    width: `calc(95% - ${dtDrawerWidth}px)`,
    marginLeft: dtDrawerWidth,
    marginTop: '10vh',
    paddingLeft: '5vw',
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${mobDrawerWidth}px)`,
      marginTop: '5vh',
      marginLeft: '90px',
      paddingLeft: '0'
    }
  },
  tCell: {
    width: '100%'
  },
  secondColumn: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '64px'
    }
  }
}));

const profileInfo = {
  handle: 'Jimothy',
  bio:
    'Morbi ut imperdiet libero, eget scelerisque lacus. Curabitur tortor nibh, viverra vel ante laoreet, imperdiet rhoncus dui. Donec at vestibulum elit, eget rutrum tellus. Pellentesque sed efficitur ipsum, at rutrum purus. Nunc leo justo, auctor vitae urna id, tempor sagittis eros. Aenean placerat risus eu placerat interdum. Vivamus bibendum neque in laoreet facilisis. Fusce id elit eu lectus pharetra pharetra ornare nec ex. Nunc dui dui, interdum eget velit imperdiet, tincidunt sodales nunc. Duis sodales magna tortor, eget hendrerit quam ultrices et.',
  interests: 'technology, coding, fitness, basebal',
  following: ['jamesy', 'mercela', 'jimothy', 'Tarquin', 'berf', 'marwaz']
};

const Profile: React.FC<Props> = () => {
  const classes = useStyles();
  const { following } = profileInfo;

  // Buttons for current user's profile
  const curUserBtn = (
    <>
      <Grid item container xs={12} md={9}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          component={RouterLink}
          to="/edit-profile"
        >
          Edit Profile
        </Button>
      </Grid>
      <Grid item container xs={12} md={9}>
        <DeleteProfile />
      </Grid>
    </>
  );

  // Buttons for other user's profile
  const otherUserBtn = (
    <>
      <Grid item container xs={12} md={9}>
        <Button fullWidth color="primary" variant="contained">
          Follow {profileInfo.handle}
        </Button>
      </Grid>
      <Grid item container xs={12} md={9}>
        <Button fullWidth color="primary" variant="outlined">
          Go To {profileInfo.handle}'s Feed
        </Button>
      </Grid>
    </>
  );
  return (
    <>
      <Header />
      <SideDrawer />
      <Grid alignItems="baseline" container className={classes.root}>
        <Grid item container xs={12} md={9} spacing={10}>
          <Grid item xs={12} md={9} container>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h4">
                {profileInfo.handle}'s Profile
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid alignItems="baseline" container item xs={12} md={9}>
            <Grid item xs={5} md={3}>
              <Typography variant="h5">Bio:</Typography>
            </Grid>
            <Grid item xs={7} md={9}>
              <Typography variant="body1">{profileInfo.bio}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid spacing={6} alignItems="baseline" container item xs={12} md={9}>
            <Grid item xs={6} md={3}>
              <Typography variant="h5">Interests:</Typography>
            </Grid>
            <Grid item xs={6} md={9}>
              <Typography variant="body1">{profileInfo.interests}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          spacing={10}
          justify="space-evenly"
          item
          container
          xs={12}
          md={3}
          className={classes.secondColumn}
        >
          <List
            subheader={
              <ListSubheader color="primary" style={{ fontSize: '1.5rem' }}>
                Following:
              </ListSubheader>
            }
          >
            {following.map((user, index) => (
              <>
                <ListItem button key={index}>
                  {user}
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
          {curUserBtn}
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
