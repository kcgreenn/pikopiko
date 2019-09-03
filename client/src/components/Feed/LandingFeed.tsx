import React from 'react';
import {
  List,
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Button
} from '@material-ui/core';
import AvatarIcon from '@material-ui/icons/AccountCircle';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '360px'
  },
  inline: {
    display: 'inline'
  }
}));

const LandingFeed: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarIcon color="primary" fontSize="large"></AvatarIcon>
          </ListItemAvatar>
          <ListItemText
            primary="Jimothy"
            secondary={
              <>
                {
                  ' dolores repudiandae qui quo perferendis asperiores eos quaerat quia aut dicta'
                }
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarIcon color="primary" fontSize="large"></AvatarIcon>
          </ListItemAvatar>
          <ListItemText
            primary="Jimothy"
            secondary={<>{"I'm a scientist, me!"}</>}
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarIcon color="primary" fontSize="large"></AvatarIcon>
          </ListItemAvatar>
          <ListItemText
            primary="Jimothy"
            secondary={<>{'My best friend is Jamesy'}</>}
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarIcon color="primary" fontSize="large"></AvatarIcon>
          </ListItemAvatar>
          <ListItemText
            primary="Jimothy"
            secondary={<>{"I'm a scientist, me!"}</>}
          ></ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarIcon color="primary" fontSize="large"></AvatarIcon>
          </ListItemAvatar>
          <ListItemText
            primary="Jimothy"
            secondary={<>{'My best friend is Jamesy'}</>}
          ></ListItemText>
        </ListItem>
      </List>
      <Button variant="outlined" color="primary" fullWidth>
        Check Out More Posts
      </Button>
    </>
  );
};

export default LandingFeed;
