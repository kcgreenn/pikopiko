import React, { useState, useContext } from 'react';
import { axiosInstance } from '../../App';
import { authContext } from '../../context/auth/AuthProvider';
import { TextField, Button } from '@material-ui/core';

interface Props {
  id: number;
  handle: string;
  updatePost: any;
}

const ReplyForm: React.FC<Props> = ({ id, handle, updatePost }, props) => {
  // access authentication context
  const authCtxt = useContext(authContext);
  // Create state for form input values
  const [replyData, setReplyData] = useState({
    text: '',
  });

  // Handle input change in state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setReplyData({ ...replyData, [name]: value });
  };

  // Send Post request on form submission
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    try {
      // Prevent page reload on submission
      e.preventDefault();
      if (authCtxt.isAuth) {
        const handle = authCtxt.user.handle;
        const res = await axiosInstance.post(`/api/post/reply/${id}`, {
          ...replyData,
          handle,
        });
        updatePost(res.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div {...props}>
      <form
        onSubmit={handleFormSubmit}
        style={{
          width: '100%',
          padding: '24px ',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          autoFocus
          onChange={handleInputChange}
          required
          id="replyText"
          name="text"
          type="text"
          label="Reply To Post"
          fullWidth
          multiline
          rows={2}
        />
        <Button
          style={{ margin: '12px 0' }}
          variant="outlined"
          color="primary"
          type="submit"
        >
          Reply
        </Button>
      </form>
    </div>
  );
};

export default ReplyForm;
