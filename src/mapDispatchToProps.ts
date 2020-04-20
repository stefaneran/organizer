import { 
  saveData, 
  loadData,
  addCategory, 
  deleteCategory, 
  updateSkillHours,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
} from '@store/thunks';

const localStorageThunks = {
  saveData,
  loadData
}

const categoryThunks = {
  addCategory,
  deleteCategory
}

const skillThunks = {
  updateSkillHours,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
}

export default {
  ...localStorageThunks,
  ...categoryThunks,
  ...skillThunks
}