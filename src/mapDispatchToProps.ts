import { addCategoryThunk, saveDataThunk, loadDataThunk } from '@store/thunks';

const localStorageThunks = {
  saveDataThunk,
  loadDataThunk
}

const categoryThunks = {
  addCategoryThunk
}

export default {
  ...localStorageThunks,
  ...categoryThunks,
}