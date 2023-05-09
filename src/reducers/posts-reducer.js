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
      break;

    case ActionTypes.FETCH_POST:
      // eslint-disable-next-line no-param-reassign
      draftState.currentPost = action.payload;
      break;

    default:
      break;
  }
}, initialState);

export default PostReducer;
