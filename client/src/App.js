import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import { UsersListView, UserPostsView } from './views';

const App = () => (
  <Fragment>
    <Route exact path="/" component={UsersListView} />
    <Route exact path="/users/:id/posts" component={UserPostsView} />
  </Fragment>
);

export default App;
