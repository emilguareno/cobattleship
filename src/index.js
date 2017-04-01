import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import logger from './middleware/logger';
import App from './App/App';
import './index.css';
import FirebaseService from './firebase';

const rootEl = document.getElementById('root');
const store = createStore(reducers, applyMiddleware(logger));

FirebaseService.initDatabase();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App/App', () => {
    const NextApp = require('./App/App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootEl
    );
  });
}