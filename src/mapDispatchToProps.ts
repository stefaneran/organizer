import { 
  saveData, 
  loadData,
  addCategory, 
  deleteCategory, 
  addHoursToSkill,
  addSkillItem
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
  addSkillItem
}

export default {
  ...localStorageThunks,
  ...categoryThunks,
  ...skillThunks
}