import { 
  configureStore, 
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import reducer, { initialState as preloadedState } from './reducer';

export default () => {

  const middleware = [...getDefaultMiddleware()];

  const store = configureStore({
    reducer,
    middleware,
    preloadedState
  });

  return store;
}