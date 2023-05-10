import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Posts() {
  // get posts from redux store
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  const navigateToPost = (postID) => {
    navigate(`/posts/${postID}`);
  };

  const [searchTags, setSearchTags] = useState('');

  const postContainsSearchTag = (post) => {
    if (searchTags === '') {
      return true;
    }
    const searchTagsArray = searchTags.toLowerCase().split(' ');
    const postTagsArray = post.tags.toLowerCase().split(',');
    console.log(`
      searchTagsArray: ${searchTagsArray}
      postTagsArray: ${postTagsArray}
    `);
    return searchTagsArray.every((searchTag) => postTagsArray.some((postTag) => postTag.includes(searchTag)));
  };

  return (
    <>
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Filter..."
          value={searchTags}
          onInput={(e) => setSearchTags(e.target.value)}
        />
      </div>
      <div className="posts">
        {posts
          .filter((post) => postContainsSearchTag(post))
          .map((post) => (
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
    </>
  );
}
