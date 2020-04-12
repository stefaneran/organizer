import { loadFromLocalStorage, saveToLocalStorage } from '@logic/localstorage.logic';
import { XP_PER_HOUR } from '@logic/skill.constants';
import { saveDataDone, loadDataDone, addCategoryDone, deleteCategoryDone, addHoursToSkillDone } from './reducer';
import { getCategoryByTitle, getCategoryIndexByTitle } from './accessors';
import getCategoryObject from './logic/getCategoryObject';

//// ----- Local Storage Thunks -----

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

//// ----- Category Thunks -----

export const addCategoryThunk = (payload) => async dispatch => {
  const categoryObject = getCategoryObject(payload);
  dispatch(addCategoryDone({ categoryObject }));
}

export const deleteCategoryThunk = ({ title }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const categories = profiles[currentProfile].categories;
  const newCategories = categories.filter((category) => category.title !== title);
  dispatch(deleteCategoryDone({ newCategories }));
}

//// ----- Skill Thunks -----

export const addHoursToSkillThunk = ({ title, hoursValue }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const category = getCategoryByTitle({ currentProfile, profiles }, title);
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, title);
  const totalHours = category.totalHours + hoursValue;
  const totalXP = category.totalXP + (hoursValue * XP_PER_HOUR);
  dispatch(addHoursToSkillDone({ categoryIndex, totalHours, totalXP }));
}