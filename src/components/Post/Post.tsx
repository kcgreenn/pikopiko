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
  Button
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
  replies: number;
  likes: any[];
  createdDate: string;
}

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '12px',
    minWidth: '100%',
    width: '100%',
    minHeight: '128px',
    borderRadius: '10px',
    margin: '8px 24px',
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

const Post: React.FC<Props> = ({
  id,
  handle,
  text,
  replies,
  likes,
  createdDate
}) => {
  const classes = useStyles();

  const [liked, setLiked] = useState(false);
  const authCtxt = useContext(authContext);
  useEffect(() => {
    if (authCtxt.isAuth) {
      likes.indexOf(authCtxt.user.sub) > -1 ? setLiked(true) : setLiked(false);
    }
  }, []);

  const handleLikePost = async (): Promise<void> => {
    try {
      await axiosInstance.post(`/api/post/like/${id}`);
      setLiked(!liked);
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
            className: classes.title
          }}
          subheaderTypographyProps={{
            variant: 'subtitle2',
            className: classes.subheader
          }}
          title={
            <Button component={RouterLink} to={`/profile/${handle}`}>
              {handle}
            </Button>
          }
          subheader={<Moment format="YY/MM/DD HH:mm" date={createdDate} />}
        />
        <CardContent>
          <Typography variant="body1" align="left" gutterBottom>
            {text}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton
            color={liked ? 'secondary' : 'inherit'}
            title="Like Post"
            onClick={handleLikePost}
          >
            <Badge badgeContent={likes.length} color="primary">
              <LikeIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="primary"
            title="See Replies"
            component={RouterLink}
            to={`/post/${id}`}
          >
            <Badge badgeContent={replies} color="secondary">
              <ListIcon />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Post;
