import React from 'react';

import UserCard from './userCard';

const UsersList = ({ users }) => {
  const renderUsers = () => users.map(user => <UserCard key={user.id} user={user} />);

  return <ul>{renderUsers()}</ul>;
};

export default UsersList;
