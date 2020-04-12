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
      state.profiles[state.currentProfile].categories = newCategories;
    },
    addHoursToSkillDone: (state, { payload }) => {
      const { categoryIndex, totalHours, totalXP } = payload;
      state.profiles[state.currentProfile].categories[categoryIndex].totalHours = totalHours;
      state.profiles[state.currentProfile].categories[categoryIndex].totalXP = totalXP;
    }
  }
});

export const { 
  saveDataDone,
  loadDataDone,
  addCategoryDone,
  deleteCategoryDone,
  addHoursToSkillDone
} = slice.actions;

export default slice.reducer;
