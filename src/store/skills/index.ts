import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'skills',
  initialState: {
    skills: {}
  },
  reducers: {
    createSkillDone: (state, { payload }) => {
      const { skillObject } = payload;
      if(!skillObject) {
        state.error = true;
        return;
      }
      state.skills.push(skillObject);
    },
    createSkillItemDone: (state, { payload }) => {
      const { skillIndex, skillItemObject } = payload;
      if(!skillItemObject) {
        state.error = true;
        return;
      }
      state.skills[skillIndex].items.push(skillItemObject);
    },
    deleteSkillDone: (state, { payload }) => {
      const { newSkills } = payload;
      state.skills = newSkills;
    },
    updateActivity: (state) => {
      const { skills } = state;
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
    updateSkillHoursDone: (state, { payload }) => {
      const { skillIndex, totalHours, totalXP, log } = payload;
      const { skills } = state;
      const skill = skills[skillIndex];
      skill.lastActivity = Date.now();
      skill.totalHours = totalHours;
      skill.totalXP = totalXP;
      skill.history.push(log);
    },
    // TODO - Move skillIndex to thunk
    updateWeeklyGoalDone: (state, { payload }) => {
      const { skills } = state;
      const { title, weeklyGoal } = payload;
      const skillIndex = getSkillIndexByTitle(skills, title);
      skills[skillIndex].weekHourGoal = weeklyGoal;
    },
    updateSkillNotesDone: (state, { payload }) => {
      const { skillIndex, newNotes } = payload;
      state.skills[skillIndex].notes = newNotes
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
      const { skills } = state;
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
      const { skills } = state;
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
    },
  }
});

export const {
  createSkillDone,
  createSkillItemDone,
  deleteSkillDone,
  updateSkillHoursDone,
  updateWeeklyGoalDone,
  updateSkillNotesDone,
  updateSkillBookDone,
  updateSkillCourseDone
} = slice.actions;

export default slice.reducer;