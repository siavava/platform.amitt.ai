/**
 * @file: app.jsx
 * @description: This file is the entry point for the application.
 * It renders the application and sets up the routing.
 * It also contains the code to follow the mouse.
 *
 */

import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, NavLink,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from './post';
import Posts from './posts';
import NewPost from './new-post';
import EditPost from './edit-post';
import { fetchPosts } from '../actions';

export default function App() {
  const dispatch = useDispatch();

  // on first load, run the load posts redux action
  useEffect(() => {
    fetchPosts()(dispatch);
  }, []);
  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="/posts/:postID/edit" element={<EditPost />} />
          <Route path="*" element={<div> post not found </div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Nav(props) {
  const navigate = useNavigate();
  const loadNav = () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('hidden');
  };

  const loadNewPostPage = () => {
    navigate('/posts/new');
  };

  const loadHomePage = () => {
    navigate('/');
  };
  const posts = useSelector((state) => state.posts.posts);
  return (
    <nav className="nav">
      <button className="logo-button" type="submit" onClick={loadHomePage}>
        <img className="app-svg" src="/images/logo.svg" alt="add" />
      </button>
      <div className="post-buttons">
        <button className="app-button" type="submit" onClick={loadNewPostPage}>
          <img className="app-svg" src="/images/add-note.svg" alt="add" />
        </button>
        <button className="app-button" type="submit" onClick={loadNav}>
          <img className="app-svg" src="/images/menu.svg" alt="add" />
        </button>
      </div>
      <ul id="nav-links" className="nav-links hidden">
        <li><NavLink className="nav-link" to="/"> all </NavLink></li>
        <li><NavLink className="nav-link" to="/posts/new">new post </NavLink></li>
        {posts.length && posts.map((post) => (
          <li key={post.id}>
            <NavLink className="nav-link" to={`/posts/${post.id}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// code to follow mouse... from ported from the starter.
const tracker = document.getElementById('tracker');
document.body.onpointermove = (event) => {
  const { pageX, pageY } = event;
  tracker.animate({
    top: `${pageY - 200}px`,
    left: `${pageX - 200}px`,
  }, {
    duration: 3000,
    fill: 'forwards',
  }, 'ease-in-out');
};
