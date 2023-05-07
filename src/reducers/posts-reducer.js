import { ActionTypes } from '../actions';

// import dispatch

export default function PostReducer(state = null, action = {}) {
  switch (action.type) {
    // fetch posts action
    case ActionTypes.FETCH_POSTS: {
      // only update if payload is not null.
      console.log(`reducing... ${action.payload}`);
      return action.payload ? action.payload : state;
    }

    // update posts action
    case ActionTypes.FETCH_POST:
      // only update if payload is not null.
      return action.payload ? action.payload : state;
    default:
      return state;
  }
}
