import React, { useContext } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { authContext } from '../../context/auth/AuthProvider';
import { Link as RouterLink } from 'react-router-dom';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Header: React.FC<Props> = () => {
  const classes = useStyles();
  const authCtxt = useContext(authContext);
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Grid container justify="flex-end">
          <Button
            style={{ marginRight: '5vw' }}
            color="inherit"
            component={RouterLink}
            to={`/profile/${authCtxt.user.handle}`}
          >
            {authCtxt.user ? authCtxt.user.handle : null}
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
