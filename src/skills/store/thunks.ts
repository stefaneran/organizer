import { updateError } from '@store/app';
import {
  createSkillDone,
  createSkillItemDone,
  deleteSkillDone,
  updateSkillDone,
  editSkillDone
} from '.';
import {
  loadingStart,
  loadingEnd
} from '@store/app';
import {
  updateSkillHoursLogic,
  updateSkillBookLogic,
  updateSkillCourseLogic
} from './thunksLogic';
import getSkillObject from '@skills/utils/getSkillObject';
import getSkillItemObject from '@skills/utils/getSkillItemObject';
import jsonFetch from '@store/utils/jsonFetch';
import { v4 } from 'uuid';

const baseUrlLocal = "http://localhost:5001/sem-organizer/us-central1/default";
const baseUrlRemote = "https://us-central1-sem-organizer.cloudfunctions.net/default";
const baseUrl = baseUrlLocal;

// TODO try this out
const genericRequest = async (
  dispatch, 
  getState, 
  url, 
  params, 
  dispatchFunction, 
  dispatchParams,
  errorMessage
) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const response = loggedIn ? await jsonFetch({
      url,
      method: 'POST',
      body: JSON.stringify({ userName, password, ...params })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(dispatchFunction({ ...dispatchParams }));
    } else {
      dispatch(updateError({
        active: true,
        message: `${errorMessage} - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `${errorMessage} - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const createSkill = ({ formData }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const newId = v4();
    const skill = getSkillObject(formData, newId);
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/create`,
      method: 'POST',
      body: JSON.stringify({ userName, password, newId, skill })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(createSkillDone({ newId, skill }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not create skill - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not create skill - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const createSkillItem = ({ id, itemType, formData }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const skillItem = getSkillItemObject(itemType, formData);
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/createItem`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, skillItem })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(createSkillItemDone({ id, skillItem }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not create skill item (${itemType}) - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not create skill item (${itemType}) - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const deleteSkill = ({ id }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/delete`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(deleteSkillDone({ id }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not delete skill - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not delete skill - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const editSkill = ({ id, property, value }) => async(dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/edit`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, property, value })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(editSkillDone({ id, property, value }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not edit skill - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not edit skill - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const updateSkillHours = ({ id, hoursValue }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user }, skillsStore: { skills } } = getState();
    const { userName, password, loggedIn } = user;
    const skill = skills[id];
    const updatedSkill = updateSkillHoursLogic(skill, hoursValue);
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/update`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, updatedSkill })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(updateSkillDone({ id, updatedSkill }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not update skill - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not update skill - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const updateSkillBook = ({ id, itemTitle, pagesValue }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user }, skillsStore: { skills } } = getState();
    const { userName, password, loggedIn } = user;
    const skill = skills[id];
    const updatedSkill = updateSkillBookLogic(skill, itemTitle, pagesValue);
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/update`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, updatedSkill })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(updateSkillDone({ id, updatedSkill }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not update skill book - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not update skill book - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const updateSkillCourse = ({ id, itemTitle, classesValue }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user }, skillsStore: { skills } } = getState();
    const { userName, password, loggedIn } = user;
    const skill = skills[id];
    const updatedSkill = updateSkillCourseLogic(skill, itemTitle, classesValue);
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/skills/update`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, updatedSkill })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(updateSkillDone({ id, updatedSkill }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not update skill course - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not update skill course - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}