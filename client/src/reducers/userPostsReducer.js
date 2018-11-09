import { FETCH_USER_POSTS, CLEAR_USER_POSTS } from '../actions/types';

export const userPostsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_POSTS:
      return action.payload || false;
    case CLEAR_USER_POSTS:
      return action.payload;
    default:
      return state;
  }
};
