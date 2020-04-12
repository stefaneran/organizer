import { loadFromLocalStorage, saveToLocalStorage } from '@logic/localstorage.logic';
import { saveDataDone, loadDataDone, addCategoryDone, deleteCategoryDone } from './reducer';
import getCategoryObject from './logic/getCategoryObject';

export const saveDataThunk = () => async (dispatch, getState) => {
  const { profiles } = getState();
  const success = saveToLocalStorage(profiles);
  dispatch(saveDataDone({ success }));
}

export const loadDataThunk = () => async dispatch => {
  const data = loadFromLocalStorage();
  if(data) {
    dispatch(loadDataDone({ data }))
  }
  // TODO - Dispatch error action
}

export const addCategoryThunk = (payload) => async dispatch => {
  const categoryObject = getCategoryObject(payload);
  dispatch(addCategoryDone({ categoryObject }));
}

export const deleteCategoryThunk = (payload) => async (dispatch, getState) => {
  const { title } = payload;
  const { currentProfile, profiles } = getState();
  const categories = profiles[currentProfile].categories;
  const newCategories = categories.filter((category) => category.title !== title);
  dispatch(deleteCategoryDone({ newCategories }));
}