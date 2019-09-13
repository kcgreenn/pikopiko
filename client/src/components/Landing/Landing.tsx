import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import landingBot from '../../img/landingBot.svg';
import landingBG from '../../img/landingBG.svg';
import LandingFeed from '../Feed/LandingFeed';
import Login from '../Forms/Login';
import Register from '../Forms/Register';

interface Props {}

const useStyles = makeStyles(theme => ({
  '@keyframes botHover': {
    '0%': {
      transform: 'translate(0,-5px)',
    },
    '50%': {
      transform: 'translate(0,5px)',
    },
    '100%': {
      transform: 'translate(0,-5px)',
    },
  },

  landing: {
    width: '100vw',
    height: '100vh',
    paddingTop: '10vh',
    padding: '5vw',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '5vh 18px 0 18px',
      width: '100vw',
      minHeight: '100vh',
      backgroundSize: 'cover',
      backgroundAttachment: 'local',
    },
    background: `url(${landingBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
  landingFeed: {
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0',
    },
  },
  landingBot: {
    [theme.breakpoints.up('md')]: {
      background: `url(${landingBot})`,
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: '40%',
      right: '20%',
      width: '20vw',
      height: '40vh',
      animationName: '$botHover',
      animationDuration: '3s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
    },
  },
}));

const Landing: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.landing}>
        <Grid container spacing={0} justify="space-evenly" alignItems="stretch">
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
              <Typography variant="h2" color="inherit" align="left">
                Piko Piko
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="left" color="inherit">
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
      </div>
    </>
  );
};

export default Landing;
