import React from 'react';
import { Grid, Typography, makeStyles, Button, Paper } from '@material-ui/core';
import Header from '../Layout/Header';
import landingBot from '../../img/landingBot.svg';
import LandingFeed from '../Feed/LandingFeed';

interface Props {}

const dtDrawerWidth = 240;
const mobDrawerWidth = 60;

const useStyles = makeStyles(theme => ({
  '@keyframes bot-hover': {
    '0%': {
      transform: 'translateY(-5px)'
    },
    '50%': {
      transform: 'translateY(5px)'
    },
    '100%': {
      transform: 'translateY(-5px)'
    }
  },
  root: {
    minHeight: '80vh',
    width: `calc(100% - ${dtDrawerWidth}px)`,
    marginLeft: dtDrawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${mobDrawerWidth}px)`,
      marginLeft: mobDrawerWidth
    },
    marginTop: '5vh'
  },
  landing: {
    width: '90vw',
    height: 'auto',
    minHeight: '80vh',
    margin: '6vh 10vh',
    paddingTop: '11vh',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      padding: '5vh 18px 0 18px',
      width: '100vw',
      minHeight: '100vh'
    }
  },
  mainGrid: {
    height: '60vh'
  },
  landingFeed: {
    [theme.breakpoints.down('sm')]: {
      margin: '10vh 0'
    }
  },
  landingBot: {
    [theme.breakpoints.up('md')]: {
      background: `url(${landingBot})`,
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: '40%',
      right: '30%',
      width: '20vw',
      height: '40vh',
      animationName: '$bot-hover',
      animationDuration: '2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out'
    }
  }
}));

const Landing: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.landingBot}></div>
      <Paper className={classes.landing}>
        <Grid
          container
          justify="center"
          alignItems="stretch"
          className={classes.mainGrid}
        >
          <Grid item container spacing={10} xs={12} md={8}>
            <Grid item xs={12}>
              <Typography variant="h2" color="primary">
                Piko Piko
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                Engage, Enlighten, Encourage and especially…just be yourself!
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={2} justify="flex-start">
              <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth>
                  Join Our Community
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} md={3} item className={classes.landingFeed}>
            <Typography variant="h6">Recent Posts</Typography>
            <LandingFeed />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Landing;
