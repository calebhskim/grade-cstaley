import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import initialState from './constants/initialState';
import serverInit from './actions/serverInit';
import Store from './store';
import registerServiceWorker from './registerServiceWorker';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE || initialState;
// Create Redux store with initial state
const store = new Store(preloadedState);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

store.dispatch(serverInit());
render(App);
registerServiceWorker();
