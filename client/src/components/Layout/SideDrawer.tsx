import React from 'react';
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
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FeedIcon from '@material-ui/icons/RssFeed';
import ProfileIcon from '@material-ui/icons/Contacts';
import AntennaIcon from '@material-ui/icons/SettingsInputAntenna';

interface Props {}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    [theme.breakpoints.down('sm')]: {
      width: '60px'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth
    },
    [theme.breakpoints.down('sm')]: {
      width: '60px'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  content: {
    marginBottom: theme.spacing(6)
  }
}));

const SideDrawer: React.FC<Props> = () => {
  const classes = useStyles();

  const drawerLinks = [
    {
      title: 'Create Post',
      icon: (
        <IconButton edge="start">
          <AddIcon />
        </IconButton>
      ),
      link: '/new-post'
    },
    {
      title: 'My Feed',
      icon: (
        <IconButton edge="start">
          <FeedIcon />
        </IconButton>
      ),
      link: '/my-feed'
    },
    {
      title: 'My Profile',
      icon: (
        <IconButton edge="start">
          <ProfileIcon />
        </IconButton>
      ),
      link: '/my-profile'
    }
  ];
  return (
    <nav>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem button>
            <AntennaIcon className={classes.menuButton} />
            <Hidden smDown>
              <Typography className={classes.title} variant="h6">
                PikoPiko
              </Typography>
            </Hidden>
          </ListItem>
          <Divider className={classes.content} />
          {drawerLinks.map((link, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <Hidden smDown>
                <ListItemText>{link.title}</ListItemText>
              </Hidden>
            </ListItem>
          ))}
          <ListItem button></ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default SideDrawer;
