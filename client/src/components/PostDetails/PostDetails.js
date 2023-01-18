import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import useStyles from './styles';
import { getPost } from '../../redux/postsSlice';

const Post = () => {
  // demeli herdefe useselectorla stateden nese goturende gec gelir cavab.Ona gore hamisi error verir cunki lap sonda gelir dispatchden cavab => dispatch(getPost(postId)).Ona gorede post- deyerini ele propsla otururem
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id: postId } = useParams();
  // post useffect icinde ona gore yaziriqki ilk renderde postun deyeri helede teyin olmur(undefined olur). useffect bitennen sonra! artiq post teyin olunur ve post deyiwdi deye iwe duwmesini saglayan mes ele dependency-de yazdigimiz [post] olur.


  useEffect(() => {
    console.log('postdetails');

    dispatch(getPost(postId));
  }, [postId]);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = post ? posts?.filter(({ _id }) => _id !== post._id) : [] // useffecte bax evvel,orda sirf postun taglariyla eyni olan postlari axtarir ve burdada esas postdan basqa(ana ekrandaki) qalan hamisini recoomended postlara at
  console.log(post);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      {post
        ? <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
              {post.tags.map((tag, index) => (
                <Link to={`/tags/${tag}`} key={index} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                  {` #${tag} `}
                </Link>
              ))}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Typography variant="h6">
              Created by:
              <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` ${post.name}`}
              </Link>
            </Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
        </div>
        : <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em" />
        </Paper>
      }

      {recommendedPosts?.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div
                className={classes.recommendedPost}
                style={{ margin: '20px', cursor: 'pointer' }}
                onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;