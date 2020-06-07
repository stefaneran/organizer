import {
  loadBackupData,
  validateData,
  updateActivity,
  updateWeeklyGoal,
  editContactSubgroup
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
  updateSkillCourse,
  addContact,
  logContactInteraction
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

const contactThunks = {
  addContact,
  logContactInteraction
}

const contactActions = {
  editContactSubgroup
}

export default {
  ...localStorageThunks,
  ...skillThunks,
  ...contactThunks,
  ...contactActions
}