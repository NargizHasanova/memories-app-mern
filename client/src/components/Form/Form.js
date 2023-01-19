import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import { createPost, updatePost } from '../../redux/postsSlice';

const Form = () => {
  const [postData, setPostData] = useState(
    {
      title: '',
      message: '',
      tags: [],
      selectedFile: ''
    }
  );

  const dispatch = useDispatch();
  const classes = useStyles();
  const { user } = useSelector(state => state.users)
  const { post } = useSelector(state => state.posts)
  const navigate = useNavigate();

  const clear = () => {
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]); // reduxu ele duzeltki bu poxu burdan silek


  // HANDLE SUBMIT ============================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return navigate("/auth")
    }
    if (!post) { // yeni hec bir posta basmamisam,bassam editlenmelidi uje
      dispatch(createPost({ ...postData, name: user?.name }));
      clear();
      window.location.reload()
    } else {
      dispatch(updatePost({ ...postData, name: user?.name }));
      clear();
    }
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (tagToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
        <Typography variant="h6">
          {post ? `Editing "${post?.title}"` : 'Creating a Memory'}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField // 12 ayliq 2min
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          className={classes.textareaMessage}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput // tags input
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags} // array of strings
            onAdd={(tag) => handleAddChip(tag)}
            onDelete={(tag) => handleDeleteChip(tag)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;