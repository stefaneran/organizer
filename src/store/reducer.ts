import { createSlice } from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';
import { skillModel } from '@interfaces/skill/Skill.interface';
import { ActivityType } from '@interfaces/general';
import { getSkillIndexByTitle } from './accessors';

export const initialState = {
  loading: false,
  error: false,
  version: '1.1.0',
  data: {
    skills: [],
    contacts: [
      {
        name: 'Stefan Milenkovic',
        location: 'Bulgaria - Sofia',
        subgroups: ['Coworkers', 'Family'],
        priority: "High",
        info: 'This is literally me, man.\nNothing more to it.',
        lastActivity: Date.now(),
        interactionHistory: [
          {
            type: 'Talk',
            activityDate: Date.now()
          },
          {
            type: 'Hangout',
            activityDate: Date.now()
          }
        ]
      },
      {
        name: 'Kaja Djuknic',
        location: 'Serbia - Belgrade',
        subgroups: ['Friends'],
        priority: "High",
        info: 'BFF in university, I love her',
        lastActivity: Date.now(),
        interactionHistory: [
          {
            type: 'Hangout',
            activityDate: Date.now()
          }
        ]
      }
    ]
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
      state.data = payload.data;
    },
    validateData: (state) => {
      const { skills } = state.data;
      // Iterate through skills
      skills.forEach(skill => {
        // Iterate through model
        Object.keys(skillModel).forEach(property => {
          if(!skill[property]) {
            skill[property] = skillModel[property];
          }
        });
      })
    },
    updateActivity: (state) => {
      const { skills } = state.data;
      skills.forEach(skill => {
        if(!skill.lastActivity) {
          skill.activity = ActivityType.Unstarted;
          return;
        }
        // Number of days since last activity
        const days = Math.abs(differenceInDays(new Date(skill.lastActivity), new Date()));
        if(days <= 3) {
          skill.activity = ActivityType.Active;
        } else if(days > 3 && days <=7) {
          skill.activity = ActivityType.Paused;
        } else {
          skill.activity = ActivityType.Neglected;
        }
      });
    },
    loadBackupData: (state, { payload }) => {
      state.data = payload.data;
    },
    addSkillDone: (state, { payload }) => {
      const { skillObject } = payload;
      if(!skillObject) {
        state.error = true;
        return;
      }
      state.data.skills.push(skillObject);
    },
    deleteSkillDone: (state, { payload }) => {
      const { newSkills } = payload;
      state.data.skills = newSkills;
    },
    updateSkillHoursDone: (state, { payload }) => {
      const { skillIndex, totalHours, totalXP, log } = payload;
      const { skills } = state.data;
      const skill = skills[skillIndex];
      skill.lastActivity = Date.now();
      skill.totalHours = totalHours;
      skill.totalXP = totalXP;
      skill.history.push(log);
    },
    // TODO - Move skillIndex to thunk
    updateWeeklyGoal: (state, { payload }) => {
      const { skills } = state.data;
      const { title, weeklyGoal } = payload;
      const skillIndex = getSkillIndexByTitle(skills, title);
      skills[skillIndex].weekHourGoal = weeklyGoal;
    },
    updateSkillNotesDone: (state, { payload }) => {
      const { skillIndex, newNotes } = payload;
      state.data.skills[skillIndex].notes = newNotes
    },
    addSkillItemDone: (state, { payload }) => {
      const { skillIndex, skillItemObject } = payload;
      if(!skillItemObject) {
        state.error = true;
        return;
      }
      state.data.skills[skillIndex].items.push(skillItemObject);
    },
    updateSkillBookDone: (state, { payload }) => {
      const { 
        skillIndex, 
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
      const { skills } = state.data;
      const skill = skills[skillIndex];
      // Update total pages read
      skill.items[itemIndex].pagesRead = currentPage;
      skill.items[itemIndex].lastActivity = Date.now();
      // Add hours and XP to skill 
      skill.totalHours += hoursRead;
      skill.totalXP += gainedXP;
      skill.lastActivity = Date.now();
      skill.history.push(log);
      // If user finished the book
      if(payload.finished) {
        // Update date finished
        skill.items[itemIndex].dateFinished = Date.now();
        // Copy
        const item = { ...skill.items[itemIndex] };
        // Add the bonus XP to the skill
        skill.totalXP += payload.totalItemXP;
        // Add item to skill archive
        skill.archive.push(item);
        // Remove item from current list
        skill.items = 
          skill.items.filter(item => item.title !== payload.itemTitle);
      }
    },
    updateSkillCourseDone: (state, { payload }) => {
      const { 
        skillIndex, 
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
      const { skills } = state.data;
      const skill = skills[skillIndex];
      // Update total pages read
      skill.items[itemIndex].classesDone = currentClass;
      skill.items[itemIndex].lastActivity = Date.now();
      // Add hours and XP to skill 
      skill.totalHours += hoursPracticed;
      skill.totalXP += gainedXP;
      skill.lastActivity = Date.now();
      skill.history.push(log);
      // If user finished the book
      if(payload.finished) {
        // Update date finished
        skill.items[itemIndex].dateFinished = Date.now();
        // Copy
        const item = { ...skill.items[itemIndex] };
        // Add the bonus XP to the skill
        skill.totalXP += payload.totalItemXP;
        // Add item to skill archive
        skill.archive.push(item);
        // Remove item from current list
        skill.items = 
          skill.items.filter(item => item.title !== payload.itemTitle);
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
  addSkillDone,
  deleteSkillDone,
  updateSkillHoursDone,
  updateSkillNotesDone,
  addSkillItemDone,
  updateSkillBookDone,
  updateSkillCourseDone
} = slice.actions;

export default slice.reducer;
