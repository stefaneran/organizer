import {
  loadBackupData,
  validateData,
  updateActivity,
  updateWeeklyGoal,
  editContactSubgroup
} from '@store/reducer';
import { 
  register,
  login,
  logout,
  saveData, 
  loadData,
  addSkill, 
  deleteSkill, 
  updateSkillHours,
  updateSkillNotes,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse,
  addContact,
  logContactInteraction
} from '@store/thunks';

const apiThunks = {
  register,
  login
}

const localStorageThunks = {
  saveData,
  loadData,
  logout,
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

const contactThunks = {
  addContact,
  logContactInteraction
}

const contactActions = {
  editContactSubgroup
}

export default {
  ...apiThunks,
  ...localStorageThunks,
  ...skillThunks,
  ...contactThunks,
  ...contactActions
}