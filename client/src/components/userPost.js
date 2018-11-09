import React from 'react';

const UserPost = ({ userPost }) => (
  <li>
    <h3>Post ID: {userPost.id}</h3>
    <p>{userPost.text}</p>
  </li>
);

export default UserPost;
