import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, getPostsBySearch } from './redux/postsSlice';
import { useEffect } from 'react';
import { getMe, signIn } from './redux/usersSlice';
// `/posts/search?searchQuery='none'&tags="mern,js"`

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getMe())
  }, [])


  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
      </Routes>
    </Container>
  );
};

export default App;