import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import configureStore from '@store/configStore';

const store = configureStore();

const appRoot = document.getElementById('app');
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), appRoot);