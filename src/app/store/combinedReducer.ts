import { combineReducers } from '@reduxjs/toolkit';
import app from 'app/store/reducer';
import activitiesStore from 'activities/store';
import contactsStore from 'contacts/store';
import inventoryStore from 'inventory/store';
import recipesStore from 'recipes/store';

export default combineReducers({
  app,
  activitiesStore,
  contactsStore,
  inventoryStore,
  recipesStore
});