import React from 'react';
import {
  ListItem,
  ListItemText,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Moment from 'react-moment';

interface Props {
  replies: ReplyInterface[];
}

export interface ReplyInterface {
  id: string;
  handle: string;
  text: string;
  createdDate: Date;
}

const ReplyList: React.FC<Props> = ({ replies }) => {
  const replyArray = replies.map((item: ReplyInterface) => (
    <React.Fragment key={item.id}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <span style={{ display: 'inline-block', width: '100%' }}>
              <Button
                component={RouterLink}
                to={`/profile/${item.handle}`}
                color="primary"
                variant="text"
                style={{ float: 'left' }}
              >
                {item.handle}
              </Button>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                style={{ float: 'right' }}
              >
                <Moment format="YY/MM/DD HH:mm" date={item.createdDate} />
              </Typography>
            </span>
          }
          secondary={
            <Typography align="justify" variant="body1">
              {item.text}
            </Typography>
          }
        />
      </ListItem>
      <Divider style={{ margin: '30px 0' }} />
    </React.Fragment>
  ));
  return <>{replyArray}</>;
};

export default ReplyList;
