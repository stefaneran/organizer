import { 
  startLoading, endLoading, apiData, loginDone, logoutDone,
  saveDataDone, loadDataDone,
  addSkillDone, deleteSkillDone, 
  updateSkillHoursDone, updateSkillNotesDone, addSkillItemDone, updateSkillBookDone, updateSkillCourseDone,
  addContactDone, logContactInteractionDone
} from './reducer';
import { 
  getSkillByTitle, getSkillIndexByTitle, 
  getSkillItemByTitle, getSkillItemIndexByTitle 
} from './accessors';
import { loadUserFromLocalStorage, loadFromLocalStorage, saveToLocalStorage } from '@store/utils/localstorage';
import { XP_PER_HOUR } from '@logic/skill.constants';
import { getHoursFromPages } from '@logic/skill.logic';
import getSkillObject from './utils/getSkillObject';
import getSkillItemObject from './utils/getSkillItemObject';
import { CategoryType } from '@interfaces/general';
import { SkillItemType } from '@interfaces/skill/SkillItem.interface';
import formatHourValue from '@utils/formatHourValue';

// TODO move to process.env
const baseUrl = "https://us-central1-sem-organizer.cloudfunctions.net/default/api";

export const register = ({ userName, password }) => async (dispatch) => {
  console.log('Register Called')
  dispatch(startLoading());
  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password })
  });
  console.log('Register response: ', response);
  if (response.status === 200) {
    dispatch(loginDone({ userName, password }));
    localStorage.setItem('user', JSON.stringify({ userName, password }));
  }
  dispatch(endLoading());
}

export const login = ({ userName, password }) => async (dispatch) => {
  console.log('Login Called')
  dispatch(startLoading());
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password })
  });
  try {
    const responseData = await response.json();
    console.log('Login response: ', responseData);
    if (response.status === 200 && responseData) {
      dispatch(apiData(responseData));
      dispatch(loginDone({ userName, password }))
      localStorage.setItem('user', JSON.stringify({ userName, password }));
    }
  } catch (e) {
    // TODO - Handle
  }
  dispatch(endLoading());
}

export const logout = () => async dispatch => {
  localStorage.removeItem('user');
  dispatch(logoutDone());
}

export const updateData = () => async (dispatch, getState) => {
  const { user, data } = getState();
  console.log('Update Called ', user, data);
  const { userName, password } = user;
  if (!userName || !password) {
    return;
  }
  dispatch(startLoading());
  const response = await fetch(`${baseUrl}/save`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password, data })
  });
  console.log('Update response: ', response);
  dispatch(endLoading());
}

//// ----- Local Storage Thunks -----

export const saveData = () => async (dispatch, getState) => {
  const { data } = getState();
  const success = saveToLocalStorage(data);
  dispatch(saveDataDone({ success }));
  dispatch(updateData());
}

// TODO - Delete deprecated
export const loadData = () => async dispatch => {
  const { success, user, data } = loadFromLocalStorage();
  if(success) {
    dispatch(loadDataDone({ user, data }))
  }
  // TODO - Dispatch error action
}

//// ----- Skill Thunks -----

export const addSkill = ({ formData }) => async dispatch => {
  const skillObject = getSkillObject(formData);
  dispatch(addSkillDone({ skillObject }));
}

export const deleteSkill = ({ title }) => async (dispatch, getState) => {
  const { data: { skills } } = getState();
  const newSkills = skills.filter(skill => skill.title !== title);
  dispatch(deleteSkillDone({ newSkills }));
}

export const updateSkillHours = ({ title, hoursValue }) => async (dispatch, getState) => {
  const { data: { skills } } = getState();
  const skill = getSkillByTitle(skills, title);
  const skillIndex = getSkillIndexByTitle(skills, title);
  const totalHours = skill.totalHours + hoursValue;
  const totalXP = skill.totalXP + (hoursValue * XP_PER_HOUR);

  const log = {
    categoryType: CategoryType.Skills,
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
    categoryType: CategoryType.Skills,
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
    categoryType: CategoryType.Skills,
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

//// ----- Contacts Thunks -----

export const addContact = ({ formData }) => async (dispatch, getState) => {
  const { data: { contacts } } = getState();
  const { name } = formData;
  const match = contacts.find(contact => contact.name === name);
  if (!match) {
    const contact = {
      ...formData,
      info: '',
      lastActivity: null,
      interactionHistory: []
    }
    dispatch(addContactDone({ contact }));
  }
}

export const logContactInteraction = ({ contactName, interactionType }) => async dispatch => {
  const log = {
    type: interactionType,
    activityDate: Date.now()
  }
  dispatch(logContactInteractionDone({ contactName, log }));
}