import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsArray, setTags] = useState([]);
  const [coverUrl, setCoverUrl] = useState('https://picsum.photos/200/300');

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = (event) => {
    event.preventDefault();
    if (!title || !content) {
      return;
    }
    // call redux action to create a new post

    // generate random 32-char id
    const id = Math.random().toString(36).substr(2, 32);
    const post = {
      id,
      title,
      content,
      coverUrl,
      tags: tagsArray.join(','),
    };

    createPost(post, navigate)(dispatch);
  };

  const changeCoverUrl = (event) => {
    setCoverUrl(event.target.value);
  };

  const cancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="new-post">
      <h1 className="new-post-page-title">Create a New Post</h1>
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
        {Array.from(new Set(tagsArray)).sort().map((tag) => (
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
          <img className="app-svg" src="/images/add-note.svg" alt="add" />
        </button>
        <button className="app-button" type="submit" onClick={cancel}>
          <img className="app-svg" src="/images/cancel-add-note.svg" alt="add" />
        </button>
      </div>
    </div>
  );
}
