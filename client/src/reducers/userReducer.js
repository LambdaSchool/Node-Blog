import { FETCH_USER, CLEAR_USER } from '../actions/types';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case CLEAR_USER:
      return action.payload;
    default:
      return state;
  }
};
