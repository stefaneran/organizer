import { combineReducers } from '@reduxjs/toolkit';
import app from './app';
import contactsStore from '@contacts/store';
import inventoryStore from '@inventory/store';
import recipesStore from '@recipes/store';

export default combineReducers({
  app,
  contactsStore,
  inventoryStore,
  recipesStore
});