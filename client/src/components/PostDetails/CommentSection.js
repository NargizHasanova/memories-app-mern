import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { commentPost } from '../../redux/postsSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const CommentSection = ({ post }) => { // state.post-dan gelir
    const { user } = useSelector(state => state.users)
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const classes = useStyles();
    const navigate = useNavigate()
    const commentsRef = useRef();
    // console.log(comments);//['ziya mammad: post2']

    const handleComment = async () => {
        if (!user) navigate("/login")
        await dispatch(commentPost(
            {
                value: `${user?.name}: ${comment}`,
                postId: post._id
            }
        ));

        setComment('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        // komment coxlugu olanda scroll yaranir ve yeni comment elave edilende scroll avtomatik en sonuncu komente scroll elesin deye bunu yaziriq
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {post?.comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c?.split(': ')[0]}</strong>
                            {c?.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                    {/* sonda yaziriqki en sonuncuya scroll etsin */}
                </div>
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant="h6">Write a comment</Typography>
                    <TextField
                        fullWidth
                        minRows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <br />
                    <Button
                        style={{ marginTop: '10px' }}
                        fullWidth
                        disabled={!comment.length}
                        color="primary"
                        variant="contained"
                        onClick={handleComment}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;