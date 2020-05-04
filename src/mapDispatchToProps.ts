import {
  loadBackupData
} from '@store/reducer';
import { 
  saveData, 
  loadData,
  addCategory, 
  deleteCategory, 
  updateSkillHours,
  updateSkillNotes,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
} from '@store/thunks';

const localStorageThunks = {
  saveData,
  loadData,
  loadBackupData
}

const categoryThunks = {
  addCategory,
  deleteCategory
}

const skillThunks = {
  updateSkillHours,
  updateSkillNotes,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
}

export default {
  ...localStorageThunks,
  ...categoryThunks,
  ...skillThunks
}