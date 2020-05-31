import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from '@store/configStore';

const store = configureStore();

const appRoot = document.getElementById('app');
ReactDOM.render(<App store={store} />, appRoot);