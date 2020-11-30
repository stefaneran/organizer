import {
  getAllSkillsDone,
  createSkillDone,
  createSkillItemDone,
  deleteSkillDone,
  updateSkillDone,
  editSkillDone
} from '.';
import {
  loadingStart,
  loadingEnd,
  updateError
} from '@store/app';
import {
  updateSkillHoursLogic,
  updateSkillBookLogic,
  updateSkillCourseLogic
} from './thunksLogic';
import getSkillObject from '@skills/utils/getSkillObject';
import getSkillItemObject from '@skills/utils/getSkillItemObject';
import genericRequest from '@store/utils/genericRequest';
import jsonFetch from '@store/utils/jsonFetch';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';

export const getAllSkills = () => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/skills/getAll`,
    {},
    getAllSkillsDone,
    {},
    `Could not get all skills`
  );
}

export const createSkill = ({ formData }) => async (dispatch, getState) => {
  const newId = v4();
  const skill = getSkillObject(formData, newId);
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/skills/create`,
    { newId, skill },
    createSkillDone,
    { newId, skill },
    `Could not create skill`
  );
}

export const createSkillItem = ({ id, itemType, formData }) => async (dispatch, getState) => {
  const skillItem = getSkillItemObject(itemType, formData);
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/skills/createItem`,
    { id, skillItem },
    createSkillItemDone,
    { id, skillItem },
    `Could not create skill item (${itemType})`
  );
}

export const deleteSkill = ({ id }) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/skills/delete`,
    { id },
    deleteSkillDone,
    { id },
    `Could not delete skill`
  );
}

export const editSkill = ({ id, property, value }) => async(dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/skills/edit`,
    { id, property, value },
    editSkillDone,
    { id, property, value },
    `Could not edit skill`
  );
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

export const updateSkillBook = ({ id, itemName, pagesValue }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user }, skillsStore: { skills } } = getState();
    const { userName, password, loggedIn } = user;
    const skill = skills[id];
    const updatedSkill = updateSkillBookLogic(skill, itemName, pagesValue);
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

export const updateSkillCourse = ({ id, itemName, classesValue }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user }, skillsStore: { skills } } = getState();
    const { userName, password, loggedIn } = user;
    const skill = skills[id];
    const updatedSkill = updateSkillCourseLogic(skill, itemName, classesValue);
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

export const uploadSkills = ({ skills }) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/skills/upload`,
    { skills },
    undefined,
    {},
    `Could not upload skills from file`
  );
}