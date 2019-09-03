import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface Props {}

const Profile: React.FC<Props> = () => {
  return (
    <Grid container>
      <Grid item container>
        <Grid item>
          <Typography variant="h4">Profile</Typography>
        </Grid>
      </Grid>
      <Grid item container></Grid>
    </Grid>
  );
};

export default Profile;
