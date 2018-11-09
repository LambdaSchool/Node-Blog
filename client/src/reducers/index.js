import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { userReducer } from './userReducer';
import { userPostsReducer } from './userPostsReducer';

export default combineReducers({
  users: usersReducer,
  user: userReducer,
  userPosts: userPostsReducer
});
