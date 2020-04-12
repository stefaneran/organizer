import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: false,
  currentProfile: 'default',
  profiles: {
    "default": {
      categories: []
    }
  }
}

const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    saveDataDone: (state, { payload }) => {
      state.error = payload.success;
    },
    loadDataDone: (state, { payload }) => {
      state.profiles = payload.data;
    },
    addCategoryDone: (state, { payload }) => {
      const { categoryObject } = payload;
      if(!categoryObject) {
        state.error = true;
        return;
      }
      state.profiles[state.currentProfile].categories.push(categoryObject);
    },
    deleteCategoryDone: (state, { payload }) => {
      const { newCategories } = payload;
      console.log('reducer ', newCategories)
      state.profiles[state.currentProfile].categories = newCategories;
    }
  }
});

export const { 
  saveDataDone,
  loadDataDone,
  addCategoryDone,
  deleteCategoryDone
} = slice.actions;

export default slice.reducer;
