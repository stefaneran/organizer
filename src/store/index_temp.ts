import { combineReducers } from '@reduxjs/toolkit';
import app from './app';
import contacts from './contacts';
import skills from './skills';

export default combineReducers({
  app,
  contacts,
  skills
});