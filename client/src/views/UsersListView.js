import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UsersList } from '../components';
import { fetchUsers } from '../actions';

class UsersListView extends Component {
  componentDidMount = () => this.props.fetchUsers();

  renderUsers = () => {
    const { users } = this.props;
    return users ? <UsersList users={users} /> : <div>Loading...</div>;
  };

  render() {
    return (
      <main>
        <h2>Users:</h2>
        {this.renderUsers()}
      </main>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UsersListView);
