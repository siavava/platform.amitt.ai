import React from 'react';

export default function NewPost() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tags, setTags] = React.useState([]);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const changeTags = (event) => {
    setTags(event.target.value.split(' '));
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
        {Array.from(new Set(tags)).map((tag) => (
          tag && <li key={tag} className="current-tag">{`#${tag}`}</li>
        ))}
      </ul>
      <input
        className="tags-input"
        type="text"
        placeholder="tags (space-separated)"
        id="tags"
        name="tags"
        value={tags.join(' ')}
        onInput={changeTags}
      />
      <button type="submit">Submit</button>
      {/* </form> */}
    </div>
  );
}
