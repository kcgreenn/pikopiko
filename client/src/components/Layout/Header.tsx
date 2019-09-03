import React from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  Grid,
  Dialog
} from '@material-ui/core';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Header: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Grid container justify="flex-end"></Grid>
      </Toolbar>
      <Dialog open={false}></Dialog>
    </AppBar>
  );
};

export default Header;
