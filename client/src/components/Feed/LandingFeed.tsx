import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { axiosInstance } from '../../App';
import Moment from 'react-moment';

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5vh',
  },
  card: {
    marginTop: '12px',
    width: '360px',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
  avatar: {
    marginRight: '48px',
    backgroundColor: theme.palette.primary.light,
  },
}));
export interface ReplyInterface {
  id: string;
  handle: string;
  text: string;
  createdDate: Date;
}
interface PostInterface {
  handle: string;
  createdDate: number;
  text: string;
  likes: string[];
  replies: ReplyInterface[] | null;
}

const LandingFeed: React.FC<Props> = () => {
  const classes = useStyles();
  const initialPost: PostInterface = {
    handle: '',
    createdDate: 0,
    text: '',
    likes: [''],
    replies: null,
  };
  const [feed, setFeed] = useState([initialPost]);
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(`/api/post/all/?skip=0&take=5`);
      const trimmedFeed = res.data.slice(0, 4);
      setFeed([...trimmedFeed]);
    })();
  }, []);
  return (
    <div className={classes.root}>
      {feed.length < 1 ? (
        <CircularProgress color="secondary" />
      ) : feed ? (
        feed.map(item => (
          <Card raised className={classes.card}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>{item.handle[0]}</Avatar>
              }
              title={item.handle}
              subheader={
                <Moment format="YY/MM/DD HH:mm" date={item.createdDate} />
              }
            />
            <CardContent>
              <Typography variant="body1">{item.text}</Typography>
            </CardContent>
          </Card>
        ))
      ) : null}
      <Typography variant="h6" style={{ color: '#f1f1f1', marginTop: '3vh' }}>
        Log In To See More
      </Typography>
    </div>
  );
};

export default LandingFeed;
