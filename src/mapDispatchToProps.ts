import { 
  saveData, 
  loadData,
  addCategory, 
  deleteCategory, 
  addHoursToSkill,
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
  addHoursToSkill,
  addSkillItem,
  updateSkillBook,
  updateSkillCourse
}

export default {
  ...localStorageThunks,
  ...categoryThunks,
  ...skillThunks
}