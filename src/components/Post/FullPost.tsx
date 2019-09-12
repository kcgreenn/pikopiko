import React, { useEffect, useContext, useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Badge,
  ListItem,
  ListItemText,
  List
} from '@material-ui/core';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import Moment from 'react-moment';
import { axiosInstance } from '../../App';
import { authContext } from '../../context/auth/AuthProvider';
import Header from '../Layout/Header';
import SideDrawer from '../Layout/SideDrawer';
import ReplyForm from './ReplyForm';
import { AxiosResponse } from 'axios';

interface Props {
  match: any;
}
interface Post {
  id: number;
  handle: string;
  text: string;
  createdDate: number;
  likes: any[];
  replies: any[];
}

const dtDrawerWidth = 240;
const mobDrawerWidth = 60;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '20vh',
    width: `calc(95% - ${dtDrawerWidth}px)`,
    marginLeft: dtDrawerWidth,
    marginTop: '10vh',
    paddingLeft: '5vw',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${mobDrawerWidth}px)`,
      marginTop: '5vh',
      marginLeft: '60px',
      paddingLeft: '0'
    }
  },
  card: {
    padding: '12px 5%',
    minWidth: '100%',
    width: '100%',
    minHeight: '128px',
    borderRadius: '10px',

    [theme.breakpoints.down('sm')]: {
      padding: '0'
    }
  },
  title: {
    float: 'left'
  },
  subheader: {
    float: 'right'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}));

export interface ReplyInterface {
  id: string;
  handle: string;
  text: string;
  createdDate: Date;
}

const FullPost: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const initialPost: Post = {
    id: 0,
    handle: '',
    text: '',
    createdDate: Date.now(),
    likes: [],
    replies: []
  };
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState(initialPost);
  //   Use authentication context
  const authCtxt = useContext(authContext);

  //   Get post data
  useEffect(() => {
    (async () => {
      const res: AxiosResponse = await axiosInstance.get(
        `/api/post/id/${match.params.id}`
      );
      setPost({
        id: res.data.id,
        handle: res.data.handle,
        text: res.data.text,
        createdDate: res.data.createdDate,
        likes: res.data.likes,
        replies: res.data.replies
      });
    })();
  }, [match.params.id]);

  //   Check if current user has liked post, show in ui
  useEffect(() => {
    if (authCtxt.isAuth) {
      post.likes.indexOf(authCtxt.user.sub) > -1
        ? setLiked(true)
        : setLiked(false);
    }
  }, [post.likes, authCtxt.isAuth, authCtxt.user.sub]);

  //   Create list of replies
  let replyList: any[] = [];
  if (post.replies.length > 0) {
    replyList = post.replies.map((item: ReplyInterface) => (
      <ListItem alignItems="flex-start">
        <ListItemText primary={item.handle}>
          <Typography>{item.text}</Typography>
        </ListItemText>
      </ListItem>
    ));
  }

  //   Like post, must be authenticated
  const handleLikePost = async (): Promise<void> => {
    try {
      await axiosInstance.post(`/api/post/like/${post.id}`);
      // show liked or not liked with state
      setLiked(!liked);
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <Header />
      <SideDrawer />
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              titleTypographyProps={{
                variant: 'body1',
                className: classes.title
              }}
              subheaderTypographyProps={{
                variant: 'subtitle2',
                className: classes.subheader
              }}
              title={post.handle}
              subheader={
                <Moment format="YY/MM/DD HH:mm" date={post.createdDate} />
              }
            />
            <CardContent>
              <Typography variant="h6" align="justify">
                {post.text}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton
                color={liked ? 'secondary' : 'inherit'}
                title="Like Post"
                onClick={handleLikePost}
              >
                <Badge badgeContent={post.likes.length} color="primary">
                  <LikeIcon />
                </Badge>
              </IconButton>
              <IconButton title="Reply To Post">
                <Badge badgeContent={post.replies} color="secondary">
                  <ReplyIcon />
                </Badge>
              </IconButton>
            </CardActions>
            {authCtxt.isAuth && (
              <ReplyForm id={match.params.id} handle={authCtxt.user.handle} />
            )}
            <List>{replyList}</List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default FullPost;
