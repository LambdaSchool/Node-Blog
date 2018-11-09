import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserPostsList } from '../components';
import { fetchUser, clearUser, fetchUserPosts, clearUserPosts } from '../actions';

class UserDetailsView extends Component {
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
    this.props.fetchUserPosts(id);
  };

  componentWillUnmount = () => {
    this.props.clearUser();
    this.props.clearUserPosts();
  };

  renderUser = () => {
    const { user } = this.props;
    return user ? <h2>{user.name}'s posts:</h2> : <div>Loading...</div>;
  };

  renderUserPosts = () => {
    const { userPosts } = this.props;
    return userPosts ? <UserPostsList userPosts={userPosts} /> : <div>Loading...</div>;
  };

  render() {
    return (
      <main>
        {this.renderUser()}
        {this.renderUserPosts()}
      </main>
    );
  }
}

const mapStateToProps = ({ user, userPosts }) => ({ user, userPosts });

export default connect(
  mapStateToProps,
  { fetchUser, clearUser, fetchUserPosts, clearUserPosts }
)(UserDetailsView);
