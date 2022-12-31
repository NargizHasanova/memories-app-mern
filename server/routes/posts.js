import express from "express";
import { createPost, getPosts, updatePost, deletePost, commentPost, likePost, getPostsBySearch, getPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router()

router.get('/search', getPostsBySearch);
router.get('/', getPosts)
router.get('/:id', getPost)

router.patch('/:id', auth, updatePost)
router.post('/:id/commentPost', auth, commentPost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)


export default router
