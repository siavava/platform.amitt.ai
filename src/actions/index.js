// import axios
import axios from 'axios';

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=amittai_siavava';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

/**
 * Fetch all posts from axios
 */
export function fetchPosts() {
  // fetch data from axios and save it.
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
      // const posts = useSelector((state) => state.posts);
      // console.log(`\n\n ${posts}\n\n`);
    }).catch((error) => {
      return () => console.error(`Error fetching posts: ${error}`);
    });
  };
}

export function createPost(post, navigate) {
  // create a post using axios
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      console.log(`\n\n ${response.data}\n\n`);
      fetchPosts()(dispatch);
      navigate(`/posts/${response.data.id}`);
    }).catch((error) => {
      return () => console.error(`Error creating post: ${error}`);
    });
  };
}

export function updatePost(post, navigate) {
  // update a post using axios
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, post).then((response) => {
      fetchPosts()(dispatch);
      navigate(`/posts/${post.id}`);
      // console.log(`response: ${response.data}`);
      // dispatch({
      //   type: ActionTypes.UPDATE_POST,
      //   payload: response.data,
      // });
    }).catch((error) => {
      return () => console.error(`Error updating post: ${error}`);
    });
  };
}

export function fetchPost(id) {
  // fetch a single post using
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
      // const posts = useSelector((state) => state.posts);
      // console.log(`\n\n ${posts}\n\n`);
    }).catch((error) => {
      return () => console.error(`Error fetching posts: ${error}`);
    });
  };
}

export function deletePost(id, navigate) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      fetchPosts()(dispatch);
      navigate('/');
    }).catch((error) => {
      return () => console.error(`Error deleting post: ${error}`);
    });
  };
}
