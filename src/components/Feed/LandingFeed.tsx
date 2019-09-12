import React from 'react';
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography
} from '@material-ui/core';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5vh'
  },
  card: {
    marginTop: '12px',
    width: '240px',
    borderRadius: '10px'
  },
  avatar: {
    marginRight: '48px',
    backgroundColor: theme.palette.primary.light
  }
}));

const LandingFeed: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography color="inherit" variant="h6">
        Recent Posts
      </Typography>
      <Card raised className={classes.card}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>J</Avatar>}
          title="Jimothy"
          subheader="Aug 20, 2016"
        />
        <CardContent>
          <Typography variant="body1">This is the first post!</Typography>
        </CardContent>
      </Card>
      <Card raised className={classes.card}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>J</Avatar>}
          title="Jimothy"
          subheader="Aug 20, 2016"
        />
        <CardContent>
          <Typography variant="body1">This is the first post!</Typography>
        </CardContent>
      </Card>
      <Card raised className={classes.card}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>J</Avatar>}
          title="Jimothy"
          subheader="Aug 20, 2016"
        />
        <CardContent>
          <Typography variant="body1">This is the first post!</Typography>
        </CardContent>
      </Card>
      <Card raised className={classes.card}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>J</Avatar>}
          title="Jimothy"
          subheader="Aug 20, 2016"
        />
        <CardContent>
          <Typography variant="body1">This is the first post!</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingFeed;
