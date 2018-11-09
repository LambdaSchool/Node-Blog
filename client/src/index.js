import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import reducers from './reducers';
import './styles/index.css';
import * as serviceWorker from './services/serviceWorker';

const store = createStore(reducers, applyMiddleware(reduxThunk, reduxLogger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
