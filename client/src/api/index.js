import axios from 'axios';

const Axios = axios.create({ baseURL: 'http://localhost:5000' });

Axios.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  // parse ona gore edirikki tokeni goture bilek icinnen .token, cunki bizde localstoragede user objectidi,tokende onun propertisidi

  return req;
});

export { Axios }

// export const fetchPost = (id) => Axios.get(`/posts/${id}`); // +
// export const fetchPosts = (page) => Axios.get(`/posts?page=${page}`); // +
// export const fetchPostsByCreator = (name) => Axios.get(`/posts/creator?name=${name}`);
// export const fetchPostsBySearch = (searchQuery) => Axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`); // +
// export const createPost = (newPost) => Axios.post('/posts', newPost); // +
// export const likePost = (postId) => Axios.patch(`/posts/${postId}/likePost`); // +
// export const comment = (value, id) => Axios.post(`/posts/${id}/commentPost`, { value: value });
// // {value: "nara hasanova:its my comment"}
// export const updatePost = (id, updatedPost) => Axios.patch(`/posts/${id}`, updatedPost); // +
// export const deletePost = (id) => Axios.delete(`/posts/${id}`); // +

// export const signIn = (formData) => Axios.post('/user/signin', formData);// +
// export const signUp = (formData) => Axios.post('/user/signup', formData);// +