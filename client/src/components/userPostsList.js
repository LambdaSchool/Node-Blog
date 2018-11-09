import React from 'react';

import UserPost from './userPost';

const UserPostsList = ({ userPosts }) => {
  const renderUserPosts = () =>
    userPosts.map(userPost => <UserPost key={userPost.id} userPost={userPost} />);

  return <ul>{renderUserPosts()}</ul>;
};

export default UserPostsList;
