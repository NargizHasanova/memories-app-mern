import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

export const getPosts = createAsyncThunk("posts/fetchPosts",
    async (page) => {
        const { data: { posts, currentPage, numberOfPages } } = await Axios.get(`/posts?page=${page}`)

        return { posts, currentPage, numberOfPages }
    }
)

export const getPost = createAsyncThunk("post/fetchPost",
    async (postId) => {
        const { data } = await Axios.get(`/posts/${postId}`)
        return data
    }
)

export const getPostsBySearch = createAsyncThunk("post/fetchPostBySearch",
    async (searchQuery) => {
        const { data } = await Axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

        return data
    }
)

export const createPost = createAsyncThunk("post/createPost",
    async (newPost) => {
        const { data } = await Axios.post('/posts', newPost)

        return data
    }
)

export const updatePost = createAsyncThunk("post/updatePost",
    async (post) => {
        const { data } = await Axios.patch(`/posts/${post._id}`, post)

        return data
    }
)

export const deletePost = createAsyncThunk("post/deletePost",
    async (postId) => {
        const { data: deletedId } = await Axios.delete(`/posts/${postId}`)
        return deletedId
    }
)

export const likePost = createAsyncThunk("post/likePost",
    async (postId) => {
        const res = await Axios.patch(`/posts/${postId}/likePost`)
        return res.data
    }
)

const initialState = {
    isLoading: true,
    error: "",
    posts: [],
    post: null,
    currentPage: 1,
    numberOfPages: undefined
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        nese: (state) => {

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getPosts.pending, (state, action) => {
    //             state.isLoading = true
    //         })
    //         .addCase(getPosts.fulfilled, (state, { payload }) => {
    //             state.posts = payload.posts
    //             state.currentPage = payload.currentPage
    //             state.numberOfPages = payload.numberOfPages
    //             state.isLoading = false
    //         })
    //         .addCase(getPosts.rejected, (state, action) => {
    //             state.error = action.error.message
    //             state.isLoading = false
    //         })
    //         .addCase(getPost.fulfilled, (state, { payload }) => {
    //             state.post = payload
    //         })
    //         .addCase(getPostsBySearch.fulfilled, (state, { payload }) => {
    //             state.isLoading = false
    //             state.posts = payload
    //         })
    //         .addCase(getPostsBySearch.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.error = action.error.message
    //         })
    //         .addCase(createPost.fulfilled, (state, { payload }) => {
    //             state.isLoading = false
    //             state.posts = [...state.posts, payload]
    //         })
    //         .addCase(likePost.fulfilled, (state, { payload }) => {
    //             // payload = updated with likelist post
    //             // state.posts = [...state.posts, payload]
    //             console.log(payload);
    //             state.posts = state.posts.map((item) => (
    //                 item._id === payload._id ? payload : item
    //             ))
    //         })

    // },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.isLoading = true
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.posts = payload.posts
            state.currentPage = payload.currentPage
            state.numberOfPages = payload.numberOfPages
            state.isLoading = false
        },
        [getPosts.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        },
        [getPost.fulfilled]: (state, { payload }) => {
            console.log('getPost fulfilled');
            state.post = payload
        },
        [getPostsBySearch.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.posts = payload
        },
        [getPostsBySearch.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error
        },
        [createPost.pending]: (state, { payload }) => {
            state.isLoading = true
        },
        [createPost.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.posts = [...state.posts, payload]
        },
        [likePost.fulfilled]: (state, { payload }) => {
            // payload = updated with likelist post
            state.posts = state.posts.map((item) => (
                item._id === payload._id ? payload : item
            ))
        },
        [deletePost.fulfilled]: (state, { payload }) => {
            state.posts = state.posts.filter((post) => post._id !== payload)
        },
        [updatePost.fulfilled]: (state, { payload }) => {
            state.posts = state.posts.map((post) => (
                post._id === payload._id ? payload : post
            ))
        },
    }
})


export const { nese } = postsSlice.actions

export default postsSlice.reducer
