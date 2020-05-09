import { 
  saveDataDone, loadDataDone, 
  addCategoryDone, deleteCategoryDone, 
  updateSkillHoursDone, updateSkillNotesDone, addSkillItemDone, updateSkillBookDone, updateSkillCourseDone
} from './reducer';
import { 
  getCategoryByTitle, getCategoryIndexByTitle, 
  getSkillItemByTitle, getSkillItemIndexByTitle 
} from './accessors';
import { loadFromLocalStorage, saveToLocalStorage } from '@store/logic/localstorage';
import { XP_PER_HOUR } from '@logic/skill.constants';
import { getHoursFromPages } from '@logic/skill.logic';
import getCategoryObject from './logic/getCategoryObject';
import getSkillItemObject from './logic/getSkillItemObject';
import { CategoryType } from '@interfaces/categories';
import { SkillItemType } from '@interfaces/categories/skill/Skill.interface';
import formatHourValue from '@utils/formatHourValue';

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

export const updateSkillHours = ({ title, hoursValue }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const category = getCategoryByTitle({ currentProfile, profiles }, title);
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, title);
  const totalHours = category.totalHours + hoursValue;
  const totalXP = category.totalXP + (hoursValue * XP_PER_HOUR);

  const log = {
    categoryType: CategoryType.Skill,
    categoryIdentifier: title,
    unit: hoursValue,
    activityDate: Date.now(),
    title: `${title}`,
    description: `Practiced ${formatHourValue(hoursValue)}`
  }
  
  dispatch(updateSkillHoursDone({ 
    categoryIndex, 
    totalHours, 
    totalXP, 
    log 
  }));
}

export const updateSkillNotes = ({ title, newNotes }) => async(dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, title);
  dispatch(updateSkillNotesDone({
    categoryIndex,
    newNotes
  }))
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
  const book = getSkillItemByTitle({ currentProfile, profiles }, skillTitle, itemTitle);

  const pagesTotal = parseInt(book.pagesTotal, 10);
  const pagesRead = pagesValue -  parseInt(book.pagesRead, 10);
  const hoursRead = getHoursFromPages(pagesRead);
  const totalItemXP = parseInt(book.totalXP, 10);

  let finished = false;
  if(pagesTotal === pagesValue) {
    finished = true;
  }
  
  const log = {
    categoryType: CategoryType.Skill,
    categoryIdentifier: skillTitle,
    subType: SkillItemType.Book,
    unit: hoursRead,
    activityDate: Date.now(),
    title: `${skillTitle} Book: ${itemTitle}`,
    description: finished ? 'Finished the book!' : `Read ${pagesRead} pages`
  }

  dispatch(updateSkillBookDone({ 
    categoryIndex, 
    itemIndex, 
    currentPage: pagesValue, 
    hoursRead,
    gainedXP: hoursRead * XP_PER_HOUR,
    totalItemXP,
    itemTitle: book.title,
    finished,
    log
  }));
}

export const updateSkillCourse = ({ skillTitle, itemTitle, classesValue }) => async (dispatch, getState) => {
  const { currentProfile, profiles } = getState();
  const categoryIndex = getCategoryIndexByTitle({ currentProfile, profiles }, skillTitle);
  const itemIndex = getSkillItemIndexByTitle({ currentProfile, profiles }, skillTitle, itemTitle);
  const course = getSkillItemByTitle({ currentProfile, profiles }, skillTitle, itemTitle);

  const classesTotal = parseInt(course.classesTotal, 10);
  const classesDone = classesValue -  parseInt(course.classesDone, 10);
  const hoursPracticed = classesDone * parseInt(course.hoursPerClass, 10);
  const totalItemXP = parseInt(course.totalXP, 10);

  let finished = false;
  if(classesTotal === classesValue) {
    finished = true;
  }

  const log = {
    categoryType: CategoryType.Skill,
    categoryIdentifier: skillTitle,
    subType: SkillItemType.Course,
    unit: hoursPracticed,
    activityDate: Date.now(),
    title: `${skillTitle} Course: ${itemTitle}`,
    description: finished ? 'Finished the course!' : `Done ${classesDone} classes`
  }
  
  dispatch(updateSkillCourseDone({ 
    categoryIndex, 
    itemIndex, 
    currentClass: classesValue, 
    hoursPracticed,
    gainedXP: hoursPracticed * XP_PER_HOUR,
    totalItemXP,
    itemTitle: course.title,
    finished,
    log
  }));
}