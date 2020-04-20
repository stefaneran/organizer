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
    updateSkillHoursDone: (state, { payload }) => {
      const { categoryIndex, totalHours, totalXP } = payload;
      state.profiles[state.currentProfile].categories[categoryIndex].totalHours = totalHours;
      state.profiles[state.currentProfile].categories[categoryIndex].totalXP = totalXP;
    },
    addSkillItemDone: (state, { payload }) => {
      const { categoryIndex, skillItemObject } = payload;
      if(!skillItemObject) {
        state.error = true;
        return;
      }
      state.profiles[state.currentProfile].categories[categoryIndex].items.push(skillItemObject);
    },
    updateSkillBookDone: (state, { payload }) => {
      const { 
        categoryIndex, 
        itemIndex, 
        currentPage, 
        hoursRead,
        gainedXP,
      } = payload;
      if(!currentPage) {
        state.error = true;
        return;
      }
      // Update total pages read
      state.profiles[state.currentProfile].categories[categoryIndex].items[itemIndex].pagesRead = currentPage;
      // Add hours and XP to skill 
      state.profiles[state.currentProfile].categories[categoryIndex].totalHours += hoursRead;
      state.profiles[state.currentProfile].categories[categoryIndex].totalXP += gainedXP;
      // If user finished the book
      if(payload.finished) {
        // Update date finished
        state.profiles[state.currentProfile].categories[categoryIndex].items[itemIndex].dateFinished = Date.now();
        // Copy
        const item = { ...state.profiles[state.currentProfile].categories[categoryIndex].items[itemIndex] };
        // Add the bonus XP to the skill
        state.profiles[state.currentProfile].categories[categoryIndex].totalXP += payload.totalItemXP;
        // Add item to skill archive
        state.profiles[state.currentProfile].categories[categoryIndex].archive.push(item);
        // Remove item from current list
        state.profiles[state.currentProfile].categories[categoryIndex].items = 
          state.profiles[state.currentProfile].categories[categoryIndex].items.filter(item => item.title !== payload.itemTitle);
      }
    },
    updateSkillCourseDone: (state, { payload }) => {
      const { 
        categoryIndex, 
        itemIndex, 
        currentClass, 
        hoursPracticed,
        gainedXP
      } = payload;
      if(!currentClass) {
        state.error = true;
        return;
      }
      // Update total pages read
      state.profiles[state.currentProfile].categories[categoryIndex].items[itemIndex].classesDone = currentClass;
      // Add hours and XP to skill 
      state.profiles[state.currentProfile].categories[categoryIndex].totalHours += hoursPracticed;
      state.profiles[state.currentProfile].categories[categoryIndex].totalXP += gainedXP;
      // If user finished the book
      if(payload.finished) {
        // Update date finished
        state.profiles[state.currentProfile].categories[categoryIndex].items[itemIndex].dateFinished = Date.now();
        // Copy
        const item = { ...state.profiles[state.currentProfile].categories[categoryIndex].items[itemIndex] };
        // Add the bonus XP to the skill
        state.profiles[state.currentProfile].categories[categoryIndex].totalXP += payload.totalItemXP;
        // Add item to skill archive
        state.profiles[state.currentProfile].categories[categoryIndex].archive.push(item);
        // Remove item from current list
        state.profiles[state.currentProfile].categories[categoryIndex].items = 
          state.profiles[state.currentProfile].categories[categoryIndex].items.filter(item => item.title !== payload.itemTitle);
      }
    }
  }
});

export const { 
  saveDataDone,
  loadDataDone,
  addCategoryDone,
  deleteCategoryDone,
  updateSkillHoursDone,
  addSkillItemDone,
  updateSkillBookDone,
  updateSkillCourseDone
} = slice.actions;

export default slice.reducer;
