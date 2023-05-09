import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router';
import { reduxForm } from 'redux-form';
import { updatePost, fetchPost } from '../actions';

export default function EditPost() {
  const { postID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPost(postID)(dispatch);
  }, []);

  const post = useSelector((state) => state.posts.currentPost) || {
    title: '',
    content: '',
    tags: '',
    coverUrl: '',
  };
  console.log(`post: ${post.title}`);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tagsArray, setTags] = useState(post.tags.split(','));
  const [coverUrl, setCoverUrl] = useState(post.coverUrl);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const changeTags = (event) => {
    // change text to lower case and remove special characters
    const text = event.target.value.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    setTags(text.split(' '));
  };

  const changeCoverUrl = (event) => {
    setCoverUrl(event.target.value);
  };

  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (!title || !content) {
      console.log('Please provide title and content!');
      return;
    }
    console.log(`id: ${postID}`);
    const newPost = {
      id: postID,
      title,
      content,
      coverUrl,
      tags: tagsArray.join(','),
    };

    updatePost(newPost, navigate)(dispatch);
  };

  const cancel = (event) => {
    event.preventDefault();
    navigate(`/posts/${postID}`);
  };

  return (
    post === undefined ? <div>Loading...</div>
      : (
        <div className="new-post">
          <h1 className="new-post-page-title">Editing post {postID}</h1>
          {/* <form> */}
          <input
            className="title-input"
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            value={title}
            onInput={changeTitle}
          />
          <textarea
            className="content-input"
            placeholder="content"
            id="content"
            name="content"
            value={content}
            onInput={changeContent}
          />
          <ul className="current-tags">
            {Array.from(new Set(tagsArray)).map((tag) => (
              tag && <li key={tag} className="current-tag">{tag}</li>
            ))}
          </ul>
          <input
            className="tags-input"
            type="text"
            placeholder="tags (space-separated)"
            id="tags"
            name="tags"
            value={tagsArray.join(' ')}
            onInput={changeTags}
          />
          <input
            type="text"
            className="tags-input"
            placeholder="cover url"
            id="cover-url"
            name="cover-url"
            value={coverUrl}
            onInput={changeCoverUrl}
          />
          <div className="post-buttons">
            <button className="app-button" type="submit" onClick={submit}>
              <img className="app-svg" src="/images/tick.svg" alt="add" />
            </button>
            <button className="app-button" type="submit" onClick={cancel}>
              <img className="app-svg" src="/images/cancel-add-note.svg" alt="add" />
            </button>
          </div>
        </div>
      )
  );
}
