import { 
  saveDataDone, loadDataDone, 
  addSkillDone, deleteSkillDone, 
  updateSkillHoursDone, updateSkillNotesDone, addSkillItemDone, updateSkillBookDone, updateSkillCourseDone
} from './reducer';
import { 
  getSkillByTitle, getSkillIndexByTitle, 
  getSkillItemByTitle, getSkillItemIndexByTitle 
} from './accessors';
import { loadFromLocalStorage, saveToLocalStorage } from '@store/logic/localstorage';
import { XP_PER_HOUR } from '@logic/skill.constants';
import { getHoursFromPages } from '@logic/skill.logic';
import getSkillObject from './logic/getSkillObject';
import getSkillItemObject from './logic/getSkillItemObject';
import { CategoryType } from '@interfaces/general';
import { SkillItemType } from '@interfaces/skill/SkillItem.interface';
import formatHourValue from '@utils/formatHourValue';

//// ----- Local Storage Thunks -----

export const saveData = () => async (dispatch, getState) => {
  const { data } = getState();
  const success = saveToLocalStorage(data);
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

export const addSkill = ({ formData }) => async dispatch => {
  const skillObject = getSkillObject(formData);
  dispatch(addSkillDone({ skillObject }));
}

export const deleteSkill = ({ title }) => async (dispatch, getState) => {
  const { data: { skills } } = getState();
  const newSkills = skills.filter(skill => skill.title !== title);
  dispatch(deleteSkillDone({ newSkills }));
}

//// ----- Skill Thunks -----

export const updateSkillHours = ({ title, hoursValue }) => async (dispatch, getState) => {
  const { data: { skills } } = getState();
  const skill = getSkillByTitle(skills, title);
  const skillIndex = getSkillIndexByTitle(skills, title);
  const totalHours = skill.totalHours + hoursValue;
  const totalXP = skill.totalXP + (hoursValue * XP_PER_HOUR);

  const log = {
    categoryType: CategoryType.Skill,
    categoryIdentifier: title,
    unit: hoursValue,
    activityDate: Date.now(),
    title: `${title}`,
    description: `Practiced ${formatHourValue(hoursValue)}`
  }
  
  dispatch(updateSkillHoursDone({ 
    skillIndex, 
    totalHours, 
    totalXP, 
    log 
  }));
}

export const updateSkillNotes = ({ title, newNotes }) => async(dispatch, getState) => {
  const { data: { skills } } = getState();
  const skillIndex = getSkillIndexByTitle(skills, title);
  dispatch(updateSkillNotesDone({
    skillIndex,
    newNotes
  }))
}

export const addSkillItem = ({ title, itemType, formData }) => async (dispatch, getState) => {
  const { data: { skills } } = getState();
  const skillItemObject = getSkillItemObject(itemType, formData);
  const skillIndex = getSkillIndexByTitle(skills, title);
  dispatch(addSkillItemDone({ 
    skillIndex, 
    skillItemObject 
  }));
}

export const updateSkillBook = ({ skillTitle, itemTitle, pagesValue }) => async (dispatch, getState) => {
  const { data: { skills } } = getState();
  const skillIndex = getSkillIndexByTitle(skills, skillTitle);
  const itemIndex = getSkillItemIndexByTitle(skills, skillTitle, itemTitle);
  const book = getSkillItemByTitle(skills, skillTitle, itemTitle);

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
    skillIndex, 
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
  const { data: { skills } } = getState();
  const skillIndex = getSkillIndexByTitle(skills, skillTitle);
  const itemIndex = getSkillItemIndexByTitle(skills, skillTitle, itemTitle);
  const course = getSkillItemByTitle(skills, skillTitle, itemTitle);

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
    skillIndex, 
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