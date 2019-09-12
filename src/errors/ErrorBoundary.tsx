import React, { Component } from 'react';
import { Grid, Typography, Button, withStyles } from '@material-ui/core';
import { Link as BrowserLink } from 'react-router-dom';
import errorBody from '../img/errorBody.svg';

interface Props {
  error?: any;
  errorInfo?: any;
  classes: any;
}
interface State {
  hasError: boolean;
}

const styles = {
  root: {
    minHeight: '80vh'
  },
  errorMessage: {},
  botBody: {
    background: `url(${errorBody})`,
    backgroundRepeat: 'no-repeat',
    height: '20vh',
    animationName: '$bot-hover',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out'
  },
  botHead: {}
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    //   TODO log error
  }

  render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      return (
        <Grid container className={classes.root}>
          <Grid item xs={12} md={6} className={classes.errorMessage}>
            <Typography variant="h6">Oops!</Typography>
            <Typography variant="body1">Something went wrong...</Typography>
            <Button
              variant="contained"
              color="primary"
              component={BrowserLink}
              to="/"
            >
              Go Back
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.botBody}></div>
            <div className={classes.botHead}></div>
          </Grid>
        </Grid>
      );
    }
    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
