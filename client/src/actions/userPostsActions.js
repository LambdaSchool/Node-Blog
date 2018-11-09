import axios from 'axios';

import { FETCH_USER_POSTS, CLEAR_USER_POSTS } from './types';

const URL = '/api/users';

export const fetchUserPosts = id => async dispatch => {
  const res = await axios.get(`${URL}/${id}/posts`);
  dispatch({ type: FETCH_USER_POSTS, payload: res.data });
};

export const clearUserPosts = () => dispatch => {
  dispatch({ type: CLEAR_USER_POSTS, payload: null });
};
