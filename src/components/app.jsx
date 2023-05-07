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
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from './post';
import Posts from './posts';
import NewPost from './new-post';
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

        { /* top nav-bar */ }

        <Nav />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="*" element={<div> post not found </div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// function About(props) {
//   return <div className="route-text"> All there is to know about me </div>;
// }

// function Welcome(props) {
//   return (
//     <>
//       <div className="route-text"> Welcome to my site. </div>
//       <Counter />
//       <Controls />
//     </>
//   );
// }

function Nav(props) {
  const posts = useSelector((state) => state.posts);
  return (
    <nav className="nav">
      <ul className="nav-links">
        <li><NavLink className="nav-link" to="/"> all </NavLink></li>
        <li><NavLink className="nav-link" to="/posts/new">new post </NavLink></li>
        {posts?.map((post) => (
          <li key={post.id}>
            <NavLink className="nav-link" to={`/posts/${post.id}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// function Test(props) {
//   const { id } = useParams();
//   return <div className="route-text"> This is a test route with ID {id} </div>;
// }

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
