import React, { useEffect, useState, useContext } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  Badge,
  IconButton,
  Button,
  Divider,
} from '@material-ui/core';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ListIcon from '@material-ui/icons/ViewList';
import Moment from 'react-moment';
import { axiosInstance } from '../../App';
import { authContext } from '../../context/auth/AuthProvider';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  id: string;
  handle: string;
  text: string;
  topic: string;
  replies: number;
  likes: any[];
  createdDate: string;
}

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '12px',
    minWidth: '100%',
    paddingLeft: '18px',
    width: '100%',
    minHeight: '128px',
    borderRadius: '10px',
    margin: '8px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  title: {
    float: 'left',
  },
  subheader: {
    float: 'right',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const Post: React.FC<Props> = ({
  id,
  handle,
  text,
  topic,
  replies,
  likes,
  createdDate,
}) => {
  const classes = useStyles();
  const [post, setPost] = useState({
    id,
    handle,
    text,
    topic,
    replies,
    likes,
    createdDate,
  });
  const [liked, setLiked] = useState(false);
  const authCtxt = useContext(authContext);

  //   Check if current user has liked post, show in ui
  useEffect(() => {
    if (authCtxt.isAuth) {
      post.likes.indexOf(authCtxt.user.sub) > -1
        ? setLiked(true)
        : setLiked(false);
    }
  }, [post.likes, authCtxt.isAuth, authCtxt.user.sub]);

  const handleLikePost = async (): Promise<void> => {
    try {
      const res = await axiosInstance.post(`/api/post/like/${post.id}`);
      const { id, handle, text, topic, likes, replies, createdDate } = res.data;
      setPost({
        id,
        handle,
        text,
        topic,
        likes,
        replies: replies.length,
        createdDate,
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <Grid item xs={12} style={{ width: '100%' }}>
      <Card raised className={classes.card}>
        <CardHeader
          titleTypographyProps={{
            variant: 'h6',
            className: classes.title,
          }}
          subheaderTypographyProps={{
            variant: 'subtitle2',
            className: classes.subheader,
          }}
          title={
            <Button component={RouterLink} to={`/profile/${post.handle}`}>
              {post.handle}
            </Button>
          }
          subheader={<Moment format="YY/MM/DD HH:mm" date={post.createdDate} />}
        />
        <CardContent>
          <Typography variant="body1" align="left" gutterBottom>
            {post.text}
          </Typography>
          <Divider />
          <Typography variant="body2">
            {post.topic ? '#' + post.topic : ''}
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
          <IconButton
            color="primary"
            title="See Replies"
            component={RouterLink}
            to={`/post/${post.id}`}
          >
            <Badge badgeContent={post.replies} color="secondary">
              <ListIcon />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Post;
