import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'skillsStore',
  initialState: {
    skills: {}
  },
  reducers: {
    createSkillDone: (state, { payload }) => {
      const { newId, skill } = payload;
      const { skills } = state;
      skills[newId] = skill;
    },
    createSkillItemDone: (state, { payload }) => {
      const { id, skillItem } = payload;
      const { skills } = state;
      skills[id].items.push(skillItem);
    },
    deleteSkillDone: (state, { payload }) => {
      const { id } = payload;
      const { skills } = state;
      delete skills[id];
    },
    // Used in actions that contain XP logic and update several properties
    updateSkillDone: (state, { payload }) => {
      const { id, updatedSkill } = payload;
      const { skills } = state;
      skills[id] = updatedSkill;
    },
    // Used in simple one-property changes
    editSkillDone: (state, { payload }) => {
      const { id, property, value } = payload;
      const { skills } = state;
      skills[id][property] = value;
    },

    // TODO Deal with
    /*
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
    */
  }
});

export const {
  createSkillDone,
  createSkillItemDone,
  deleteSkillDone,
  updateSkillDone,
  editSkillDone
} = slice.actions;

export default slice.reducer;