import { createSlice } from '@reduxjs/toolkit';
import { addCategoryAction } from './actions';

export const initialState = {
  loading: false,
  currentProfile: 'default',
  profiles: {
    "default": {
      categories: []
    }
  }
}

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (store, payload) => addCategoryAction(store, payload)
  }
});

export const { 
  addCategory
} = slice.actions;

export default slice.reducer;
