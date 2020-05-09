import { createSlice } from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';
import { skillModel } from '@interfaces/categories/skill/Skill.interface';
import { ActivityType } from '@interfaces/categories';
import { getCategoryIndexByTitle } from './accessors';

export const initialState = {
  loading: false,
  error: false,
  currentProfile: 'default',
  profiles: {
    "default": {
      categories: []
    }
  },
  version: '1.1.0'
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
    validateData: (state) => {
      const { categories } = state.profiles[state.currentProfile];
      // Iterate through categories
      categories.forEach(category => {
        // Iterate through model
        Object.keys(skillModel).forEach(property => {
          if(!category[property]) {
            category[property] = skillModel[property];
          }
        });
      })
    },
    updateActivity: (state) => {
      const { categories } = state.profiles[state.currentProfile];
      categories.forEach(category => {
        if(!category.lastActivity) {
          category.activity = ActivityType.Unstarted;
          return;
        }
        // Number of days since last activity
        const days = Math.abs(differenceInDays(new Date(category.lastActivity), new Date()));
        if(days <= 3) {
          category.activity = ActivityType.Active;
        } else if(days > 3 && days <=7) {
          category.activity = ActivityType.Paused;
        } else {
          category.activity = ActivityType.Neglected;
        }
      });
    },
    loadBackupData: (state, { payload }) => {
      state.profiles[state.currentProfile].categories = payload.categories;
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
      const { categoryIndex, totalHours, totalXP, log } = payload;
      const { categories } = state.profiles[state.currentProfile];
      const category = categories[categoryIndex];
      category.lastActivity = Date.now();
      category.totalHours = totalHours;
      category.totalXP = totalXP;
      category.history.push(log);
    },
    updateWeeklyGoal: (state, { payload }) => {
      const { profiles, currentProfile } = state;
      const { categories } = state.profiles[state.currentProfile];
      const { title, weeklyGoal } = payload;
      const categoryIndex = getCategoryIndexByTitle({ profiles, currentProfile }, title);
      categories[categoryIndex].weekHourGoal = weeklyGoal;
    },
    updateSkillNotesDone: (state, { payload }) => {
      const { categoryIndex, newNotes } = payload;
      state.profiles[state.currentProfile].categories[categoryIndex].notes = newNotes
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
        log
      } = payload;
      if(!currentPage) {
        state.error = true;
        return;
      }
      const { categories } = state.profiles[state.currentProfile];
      const category = categories[categoryIndex];
      // Update total pages read
      category.items[itemIndex].pagesRead = currentPage;
      category.items[itemIndex].lastActivity = Date.now();
      // Add hours and XP to skill 
      category.totalHours += hoursRead;
      category.totalXP += gainedXP;
      category.lastActivity = Date.now();
      category.history.push(log);
      // If user finished the book
      if(payload.finished) {
        // Update date finished
        category.items[itemIndex].dateFinished = Date.now();
        // Copy
        const item = { ...category.items[itemIndex] };
        // Add the bonus XP to the skill
        category.totalXP += payload.totalItemXP;
        // Add item to skill archive
        category.archive.push(item);
        // Remove item from current list
        category.items = 
          category.items.filter(item => item.title !== payload.itemTitle);
      }
    },
    updateSkillCourseDone: (state, { payload }) => {
      const { 
        categoryIndex, 
        itemIndex, 
        currentClass, 
        hoursPracticed,
        gainedXP,
        log
      } = payload;
      if(!currentClass) {
        state.error = true;
        return;
      }
      const { categories } = state.profiles[state.currentProfile];
      const category = categories[categoryIndex];
      // Update total pages read
      category.items[itemIndex].classesDone = currentClass;
      category.items[itemIndex].lastActivity = Date.now();
      // Add hours and XP to skill 
      category.totalHours += hoursPracticed;
      category.totalXP += gainedXP;
      category.lastActivity = Date.now();
      category.history.push(log);
      // If user finished the book
      if(payload.finished) {
        // Update date finished
        category.items[itemIndex].dateFinished = Date.now();
        // Copy
        const item = { ...category.items[itemIndex] };
        // Add the bonus XP to the skill
        category.totalXP += payload.totalItemXP;
        // Add item to skill archive
        category.archive.push(item);
        // Remove item from current list
        category.items = 
          category.items.filter(item => item.title !== payload.itemTitle);
      }
    }
  }
});

export const { 
  saveDataDone,
  loadDataDone,
  loadBackupData,
  validateData,
  updateActivity,
  updateWeeklyGoal,
  addCategoryDone,
  deleteCategoryDone,
  updateSkillHoursDone,
  updateSkillNotesDone,
  addSkillItemDone,
  updateSkillBookDone,
  updateSkillCourseDone
} = slice.actions;

export default slice.reducer;
