import { 
  saveDataDone, loadDataDone, 
  addCategoryDone, deleteCategoryDone, 
  addHoursToSkillDone, addSkillItemDone, updateSkillBookDone, updateSkillCourseDone
} from './reducer';
import { 
  getCategoryByTitle, getCategoryIndexByTitle, 
  getSkillItemByTitle, getSkillItemIndexByTitle 
} from './accessors';
import { loadFromLocalStorage, saveToLocalStorage } from '@logic/localstorage.logic';
import { XP_PER_HOUR } from '@logic/skill.constants';
import getCategoryObject from './logic/getCategoryObject';
import getSkillItemObject from './logic/getSkillItemObject';

//// ----- Local Storage Thunks -----

export const saveData = () => async (dispatch, getState) => {
  const { profiles } = getState();
  const success = saveToLocalStorage(profiles);
  dispatch(saveDataDone({ success }));
}

export const loadData = () => async dispatch => {
  const data = loadFromLocalStorage();
  if(data) {
    dispatch(loadDataDone({ data }))
  }
  // TODO - Dispatch error action
}

//// ----- Category Thunks -----

export const addCategory = ({ categoryType, formData }) => async dispatch => {
  const categoryObject = getCategoryObject(categoryType, formData);
  dispatch(addCategoryDone({ categoryObject }));
}

export const deleteCategory = ({ title }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const categories = profiles[currentProfile].categories;
  const newCategories = categories.filter((category) => category.title !== title);
  dispatch(deleteCategoryDone({ newCategories }));
}

//// ----- Skill Thunks -----

export const addHoursToSkill = ({ title, hoursValue }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const category = getCategoryByTitle({ currentProfile, profiles }, title);
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, title);
  const totalHours = category.totalHours + hoursValue;
  const totalXP = category.totalXP + (hoursValue * XP_PER_HOUR);
  dispatch(addHoursToSkillDone({ categoryIndex, totalHours, totalXP }));
}

export const addSkillItem = ({ title, itemType, formData }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const skillItemObject = getSkillItemObject(itemType, formData);
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, title);
  dispatch(addSkillItemDone({ categoryIndex, skillItemObject }));
}

export const updateSkillBook = ({ skillTitle, itemTitle, pagesValue }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, skillTitle);
  const itemIndex = getSkillItemIndexByTitle({ currentProfile, profiles }, skillTitle, itemTitle);
  const item = getSkillItemByTitle({ currentProfile, profiles }, skillTitle, itemTitle);
  const pagesRead = pagesValue;
  // TODO XP
  dispatch(updateSkillBookDone({ categoryIndex, itemIndex, pagesRead }));
}

export const updateSkillCourse = ({ skillTitle, itemTitle, classesValue }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, skillTitle);
  const itemIndex = getSkillItemIndexByTitle({ currentProfile, profiles }, skillTitle, itemTitle);
  const item = getSkillItemByTitle({ currentProfile, profiles }, skillTitle, itemTitle);
  const classesDone = classesValue;
  // TODO XP
  dispatch(updateSkillCourseDone({ categoryIndex, itemIndex, classesDone }));
}