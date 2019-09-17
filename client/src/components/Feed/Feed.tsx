import React, { useEffect, useContext, useState } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import Header from '../Layout/Header';
import SideDrawer from '../Layout/SideDrawer';
import Post from '../Post/Post';
import { authContext } from '../../context/auth/AuthProvider';
import { axiosInstance } from '../../App';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReplyInterface } from '../Post/FullPost';

interface Props {}

const dtDrawerWidth = 240;
const mobDrawerWidth = 60;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '70vh',
    width: `calc(95% - ${dtDrawerWidth}px)`,
    marginLeft: dtDrawerWidth,
    marginTop: '10vh',
    paddingLeft: '5vw',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${mobDrawerWidth}px)`,
      marginTop: '5vh',
      marginLeft: '50px',
      paddingLeft: '0',
    },
  },
  feedList: {
    width: '640px',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
}));

export interface Post {
  id: string;
  handle: string;
  topic: string;
  text: string;
  replies: ReplyInterface[];
  likes: string[];
  createdDate: string;
}

const Feed: React.FC<Props> = () => {
  const classes = useStyles();
  //   Set Pagination Skip
  const initialFeed: Post[] = [];
  const [skip, setSkip] = useState(0);
  const [feed, setFeed] = useState(initialFeed);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const authCtxt = useContext(authContext);

  const handleLoadMorePosts = async (): Promise<void> => {
    try {
      if (authCtxt.isAuth) {
        authCtxt.setLoading();
        const res = await axiosInstance.get(`/api/profile/feed/q?skip=${skip}`);
        const newSkip = skip + 1;
        setSkip(newSkip);
        authCtxt.clearLoading();
        if (res.data[0] === null || res.data.length === 0) {
          setHasMorePosts(false);
        } else {
          setFeed([...feed, ...res.data]);
        }
      }
      if (authCtxt.isAuth && feed.length < 5) {
        authCtxt.setLoading();
        const res = await axiosInstance.get(`/api/post/all/?skip=${skip}`);
        const newSkip = skip + 10;
        setSkip(newSkip);
        authCtxt.clearLoading();
        if (res.data[0] === null || res.data.length === 0) {
          setHasMorePosts(false);
        } else {
          setFeed([...feed, ...res.data]);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (authCtxt.isAuth) {
          // If logged in get posts from followed users
          setSkip(0);
          setFeed(initialFeed);
          handleLoadMorePosts();
        } else {
          // Else get generic feed
          setSkip(0);
          setFeed(initialFeed);
          handleLoadMorePosts();
        }
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  // Update feed with new post
  const handleNewPost = (post: any): void => {
    const updatedFeed = feed;
    updatedFeed.unshift(post);
    setFeed([...updatedFeed]);
  };

  return (
    <>
      <Header />
      <SideDrawer newPost={handleNewPost} />

      <Grid
        direction="column"
        container
        justify="flex-start"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom={true}>
            Post Feed
          </Typography>
        </Grid>
        {!feed && <CircularProgress />}
        <InfiniteScroll
          className={classes.feedList}
          style={{
            padding: '0',
            marginLeft: '-30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'visible',
          }}
          dataLength={feed.length}
          next={handleLoadMorePosts}
          hasMore={hasMorePosts}
          initialScrollY={0}
          endMessage={
            <Typography
              variant="h6"
              style={{ marginTop: '5vh' }}
              align="center"
            >
              No More Posts
            </Typography>
          }
          loader={
            <CircularProgress
              style={{ position: 'absolute', bottom: '5%', left: '50%' }}
            />
          }
        >
          {' '}
          {/* {feedList} */}
          {feed.length > 0 &&
            feed.map((item: Post) => (
              <Post
                key={item.id}
                topic={item.topic}
                id={item.id}
                handle={item.handle}
                text={item.text}
                replies={item.replies.length}
                likes={item.likes}
                createdDate={item.createdDate}
              />
            ))}
        </InfiniteScroll>
      </Grid>
    </>
  );
};

export default Feed;
