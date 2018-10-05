import React from 'react';
import axios from 'axios';

import User from './User';

class UserList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get('http://localhost:7000/')
      .then(response => this.setState({users : response.data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return <User key={user.id} user={user} />
        })}
      </div>
    )
  }
}

export default UserList;