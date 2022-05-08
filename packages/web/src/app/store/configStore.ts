import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import combinedReducer from './combinedReducer';

export default () => {

  const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    // preloadedState
  });

  return store;
}