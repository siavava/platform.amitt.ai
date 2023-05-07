import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

export default function Post() {
  const { postID } = useParams();
  const post = useSelector((state) => state.posts?.find((p) => p?.id === postID));
  return (
    post === undefined
      ? <div> post not found </div>
      : (
        <div key={post.id} className="post">
          <img className="post-cover" src={post.coverUrl} alt={post.title} />
          <h2 className="post-title">{post.title}</h2>
          {/* <p className="post-content">{post?.content}</p> */}
          <ul className="post-tags">
            {post.tags?.split(',').map((tag) => (
              <li key={tag} className="post-tag">{tag}</li>
            ))}
          </ul>
        </div>
      )
  );
}
