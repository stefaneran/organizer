import { 
  configureStore, 
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer, { initialState as preloadedState } from './reducer';

export default () => {

  const middleware = [...getDefaultMiddleware(), thunk];

  const store = configureStore({
    reducer,
    middleware,
    preloadedState
  });

  return store;
}