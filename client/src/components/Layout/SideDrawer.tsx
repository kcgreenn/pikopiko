import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  makeStyles,
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Typography,
} from '@material-ui/core';
import FeedIcon from '@material-ui/icons/RssFeed';
import ProfileIcon from '@material-ui/icons/Contacts';
import AntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import BlockIcon from '@material-ui/icons/Block';
import NewPost from '../Post/NewPost';
import { authContext } from '../../context/auth/AuthProvider';

interface Props {
  newPost?: any;
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    [theme.breakpoints.down('sm')]: {
      width: '60px',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      width: '60px',
    },
  },
}));

const SideDrawer: React.FC<Props> = ({ newPost }) => {
  const classes = useStyles();
  const authCtxt = useContext(authContext);

  const handleLogout = (): void => {
    authCtxt.logout();
  };

  const drawerLinks = [
    {
      title: 'My Feed',
      icon: (
        <IconButton edge="start">
          <FeedIcon />
        </IconButton>
      ),
      link: '/feed',
    },
    {
      title: 'My Profile',
      icon: (
        <IconButton edge="start">
          <ProfileIcon />
        </IconButton>
      ),
      link: `/profile/${authCtxt.isAuth ? authCtxt.user.handle : null}`,
    },
  ];
  return (
    <nav>
      <Drawer
        open={authCtxt.isAuth}
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton>
          <AntennaIcon />
          <Hidden smDown>
            <Typography variant="h6">PikoPiko</Typography>
          </Hidden>
        </IconButton>{' '}
        <Divider style={{ marginTop: '8px' }} />
        <List
          style={{
            height: '75vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <NewPost addPost={newPost} />
          {drawerLinks.map((link, index) => (
            <ListItem button key={index} component={RouterLink} to={link.link}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <Hidden smDown>
                <ListItemText>{link.title}</ListItemText>
              </Hidden>
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <Hidden smDown>
              <ListItemText>Logout</ListItemText>
            </Hidden>
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default SideDrawer;
