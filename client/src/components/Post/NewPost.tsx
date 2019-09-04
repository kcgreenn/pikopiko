import React, { useState } from 'react';
import Header from '../Layout/Header';
import SideDrawer from '../Layout/SideDrawer';
import { Grid, makeStyles, Typography, Input, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

interface Props {}

// Offset drewer width
const dtDrawerWidth = 240;
const mobDrawerWidth = 60;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '80vh',
    width: `calc(95% - ${dtDrawerWidth}px)`,
    marginLeft: dtDrawerWidth,
    marginTop: '10vh',
    paddingLeft: '5vw',
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${mobDrawerWidth}px)`,
      marginTop: '5vh',
      marginLeft: '90px',
      paddingLeft: '0'
    }
  }
}));

const NewPost: React.FC<Props> = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState({ topic: '', text: '' });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.currentTarget.name;
    const value = e.currentTarget.value;
    setPostData({
      ...postData,
      [target]: value
    });
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO dispatch create post request
    // Reset Form
  };
  return (
    <>
      <Header />
      <SideDrawer />
      <Grid alignItems="baseline" container className={classes.root}>
        <Grid
          component="form"
          onSubmit={handleFormSubmit}
          item
          container
          xs={12}
          md={9}
          spacing={10}
        >
          <Grid item xs={12} md={9} container>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h4">
                New Post
              </Typography>
            </Grid>
          </Grid>
          <Grid spacing={6} alignItems="baseline" container item xs={12} md={9}>
            <Grid item xs={6} md={3}>
              <Typography variant="h5">Topic:</Typography>
            </Grid>
            <Grid item xs={6} md={9}>
              <Input
                name="topic"
                id="topic"
                onChange={handleInputChange}
                fullWidth
                value={postData.topic}
              />
            </Grid>
          </Grid>
          <Grid alignItems="baseline" container item xs={12} md={9}>
            <Grid item xs={5} md={3}>
              <Typography variant="h5">Text:</Typography>
            </Grid>
            <Grid item xs={7} md={9}>
              <Input
                multiline={true}
                name="text"
                id="text"
                onChange={handleInputChange}
                fullWidth
                rows={8}
                value={postData.text}
              ></Input>
            </Grid>
          </Grid>
          <Grid justify="center" item xs={12} container spacing={10}>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/my-feed"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create Post
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPost;
