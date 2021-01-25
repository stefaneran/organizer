import { combineReducers } from '@reduxjs/toolkit';
import app from './app';
import inventoryStore from '@inventory/store';
import recipesStore from '@recipes/store';

export default combineReducers({
  app,
  inventoryStore,
  recipesStore
});