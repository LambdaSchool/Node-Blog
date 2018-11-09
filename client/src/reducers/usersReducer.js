import { FETCH_USERS } from '../actions/types';

export const usersReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload || false;
    default:
      return state;
  }
};
