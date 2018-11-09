import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => (
  <li>
    <Link to={`/users/${user.id}/posts`}>
      <h3>{user.name}</h3>
    </Link>
    <div>ID: {user.id}</div>
  </li>
);

export default UserCard;
