import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from 'app/container/AppContainer';
import configureStore from 'app/store/configStore';

const store = configureStore();

const appRoot = document.getElementById('app');
ReactDOM.render((
  <Provider store={store}>
    <AppContainer />
  </Provider>
), appRoot);