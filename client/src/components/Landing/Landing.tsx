import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import landingBot from '../../img/landingBot.svg';
import landingBG from '../../img/landingBG.svg';
import LandingFeed from '../Feed/LandingFeed';
import Login from '../Forms/Login';
import Register from '../Forms/Register';

interface Props {}

const useStyles = makeStyles(theme => ({
  landing: {
    width: '100vw',
    height: '100vh',
    padding: '0',
    margin: '0',
    overflowX: 'hidden',
    backgroundAttachment: 'local',
    [theme.breakpoints.down('sm')]: {
      padding: '5vh 18px 0 18px',
      width: '100vw',
      minHeight: '100vh',
      backgroundSize: 'cover',
    },
    background: `url(${landingBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  landingFeed: {
    marginTop: '3vh',
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0',
    },
  },
}));

const Landing: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        className={classes.landing}
        container
        spacing={0}
        justify="space-evenly"
        alignItems="center"
      >
        <Grid
          item
          container
          spacing={10}
          xs={12}
          md={8}
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={12}>
            <Typography
              variant="h2"
              align="left"
              style={{ color: '#f1f1f1', marginTop: '2vh' }}
            >
              Piko Piko
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ color: '#f1f1f1', marginTop: '9vh' }}
              align="left"
            >
              Engage, Enlighten, Encourage and especially…just be yourself!
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2} justify="flex-start">
            <Grid item xs={12} md={4}>
              <Register />
            </Grid>
            <Grid item xs={12} md={4}>
              <Login />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={3} item className={classes.landingFeed}>
          <LandingFeed />
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
