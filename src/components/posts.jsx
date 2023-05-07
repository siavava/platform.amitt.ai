import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Posts() {
  // get posts from redux store
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  // const navigateToPost = (id) => {

  return (
    <div className="posts">
      {posts?.map((post) => (
        <div
          key={post.id}
          onClick={navigate(`/posts/${post.id}`)}
          role="button"
          tabIndex={0}
          className="post"
        >
          <img className="post-cover" src={post.coverUrl} alt={post.title} />
          <h2 className="post-title">{post.title}</h2>
          {/* <p className="post-content">{post?.content}</p> */}
          <ul className="post-tags">
            {post.tags?.split(',').map((tag) => (
              <li key={tag} className="post-tag">{tag}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
