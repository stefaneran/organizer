import { 
  saveDataThunk, 
  loadDataThunk,
  addCategoryThunk, 
  deleteCategoryThunk, 
  addHoursToSkillThunk
} from '@store/thunks';

const localStorageThunks = {
  saveDataThunk,
  loadDataThunk
}

const categoryThunks = {
  addCategoryThunk,
  deleteCategoryThunk
}

const skillThunks = {
  addHoursToSkillThunk
}

export default {
  ...localStorageThunks,
  ...categoryThunks,
  ...skillThunks
}