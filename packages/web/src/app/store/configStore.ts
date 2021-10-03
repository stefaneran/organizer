import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import combinedReducer from './combinedReducer';

export default () => {

  const middleware = [...getDefaultMiddleware(), thunk];

  const store = configureStore({
    reducer: combinedReducer,
    middleware,
    // preloadedState
  });

  return store;
}