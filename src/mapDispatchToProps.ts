import {
  loadBackupData,
  validateData,
  updateActivity,
  updateWeeklyGoal
} from '@store/reducer';
import { 
  saveData, 
  loadData,
  addSkill, 
  deleteSkill, 
  updateSkillHours,
  updateSkillNotes,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
} from '@store/thunks';

const localStorageThunks = {
  saveData,
  loadData,
  loadBackupData,
  validateData
}

const skillThunks = {
  updateActivity,
  addSkill,
  deleteSkill,
  updateSkillHours,
  updateWeeklyGoal,
  updateSkillNotes,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
}

export default {
  ...localStorageThunks,
  ...skillThunks
}