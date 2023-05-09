import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { fetchPost, deletePost } from '../actions';

export default function Post() {
  const { postID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPost(postID)(dispatch);
  }, [postID]);

  const post = useSelector((state) => state.posts.currentPost);

  const navigate = useNavigate();
  const editCurrentPost = () => {
    navigate(`/posts/${postID}/edit`);
  };

  const deleteCurrentPost = () => {
    deletePost(postID)(dispatch);
    navigate('/');
  };

  return (
    post === undefined
      ? <div> post not found </div>
      : (
        <div key={post?.id} className="post">
          <img className="post-cover" src={post?.coverUrl} alt={post?.title} />
          <h2 className="post-title">{post?.title}</h2>
          <ReactMarkdown className="post-content">{post?.content}</ReactMarkdown>
          <ul className="current-tags">
            {Array.from(new Set(post?.tags.split(','))).sort().map((tag) => (
              <li key={tag} className="current-tag">{tag}</li>
            ))}
          </ul>

          <div className="post-buttons">
            <button className="app-button" type="submit" onClick={editCurrentPost}>
              <img className="app-svg" src="/images/edit.svg" alt="add" />
            </button>
            <button className="app-button" type="submit" onClick={deleteCurrentPost}>
              <img className="app-svg" src="/images/delete.svg" alt="add" />
            </button>
          </div>
        </div>
      )
  );
}
