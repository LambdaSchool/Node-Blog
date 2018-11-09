import axios from 'axios';

import { FETCH_USER, CLEAR_USER } from './types';

const URL = '/api/users';

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`${URL}/${id}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const clearUser = () => dispatch => {
  dispatch({ type: CLEAR_USER, payload: null });
};
