import React, { useContext } from 'react';
import { AppBar, makeStyles, Toolbar, Grid, Button } from '@material-ui/core';
import { authContext } from '../../context/auth/AuthProvider';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';

interface Props {
  history: any;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Header: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const authCtxt = useContext(authContext);

  const handleBack = () => {
    history.goBack();
  };
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Grid container justify="flex-end">
          <Button onClick={handleBack} color="inherit" title="Back">
            <LeftArrow color="inherit" />
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
