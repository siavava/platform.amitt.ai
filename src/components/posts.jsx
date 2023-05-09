import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Posts() {
  // get posts from redux store
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  const navigateToPost = (postID) => {
    navigate(`/posts/${postID}`);
  };

  return (
    <div className="posts">
      {posts?.map((post) => (
        <div
          key={post.id}
          onClick={() => navigateToPost(post.id)}
          role="button"
          tabIndex={0}
          className="post"
        >
          <img className="post-cover" src={post.coverUrl} alt={post.title} />
          <h2 className="post-title">{post.title}</h2>
          <ul className="current-tags">
            {Array.from(new Set(post.tags?.split(','))).sort().map((tag) => (
              <li key={tag} className="current-tag">{tag}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
