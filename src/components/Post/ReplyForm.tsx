import React, { useState, useContext } from 'react';
import { axiosInstance } from '../../App';
import { authContext } from '../../context/auth/AuthProvider';
import { TextField, Button } from '@material-ui/core';

interface Props {
  id: number;
  handle: string;
}

const ReplyForm: React.FC<Props> = ({ id, handle }) => {
  // access authentication context
  const authCtxt = useContext(authContext);
  // Create state for form input values
  const [replyData, setReplyData] = useState({
    text: ''
  });

  // Handle input change in state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setReplyData({ ...replyData, [name]: value });
  };

  // Send Post request on form submission
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      // Prevent page reload on submission
      e.preventDefault();
      if (authCtxt.isAuth) {
        const handle = authCtxt.user.handle;
        await axiosInstance.post(`/api/post/reply/${id}`, {
          ...replyData,
          handle
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        style={{
          width: '90%',
          margin: '18px 5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextField
          onChange={handleInputChange}
          required
          autoFocus
          id="replyText"
          name="text"
          type="text"
          label="Reply To Post"
          fullWidth
          multiline
        />
        <Button type="submit">Reply</Button>
      </form>
    </>
  );
};

export default ReplyForm;
