import { addCategoryThunk, deleteCategoryThunk, saveDataThunk, loadDataThunk } from '@store/thunks';

const localStorageThunks = {
  saveDataThunk,
  loadDataThunk
}

const categoryThunks = {
  addCategoryThunk,
  deleteCategoryThunk
}

export default {
  ...localStorageThunks,
  ...categoryThunks
}