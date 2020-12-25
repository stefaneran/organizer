import { combineReducers } from '@reduxjs/toolkit';
import app from './app';
import contactsStore from '@contacts/store';
import skillsStore from '@skills/store';
import inventoryStore from '@inventory/store';

export default combineReducers({
  app,
  contactsStore,
  skillsStore,
  inventoryStore
});