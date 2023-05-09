import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  posts: [],
  currentPost: null,
};

const PostReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    // fetch posts action
    case ActionTypes.FETCH_POSTS:
      // eslint-disable-next-line no-param-reassign
      draftState.posts = action.payload;
      console.log('posts', draftState.posts);
      break;

    case ActionTypes.FETCH_POST:
      // eslint-disable-next-line no-param-reassign
      draftState.currentPost = action.payload;
      console.log('currentPost', draftState.currentPost);
      break;

    default:
      break;
  }
}, initialState);

export default PostReducer;
