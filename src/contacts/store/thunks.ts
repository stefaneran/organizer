import { updateError } from '@store/app';
import {
  createContactDone,
  editContactDone,
  deleteContactDone,
  addContactInteractionDone
} from '.';
import {
  loadingStart,
  loadingEnd
} from '@store/app';
import jsonFetch from '@store/utils/jsonFetch';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';

export const createContact = ({ formData }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const newId = v4();
    const contact = {
      id: newId,
      ...formData,
      info: '',
      lastInteraction: Date.now(),
      hangouts: []
    }
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/contacts/create`,
      method: 'POST',
      body: JSON.stringify({ userName, password, newId, contact })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(createContactDone({ newId, contact }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not create contact - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not create contact - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const deleteContact = ({ id }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/contacts/delete`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(deleteContactDone({ id }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not delete contact - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not delete contact - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const editContact = ({ id, property, value }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/contacts/edit`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, property, value })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(editContactDone({ id, property, value }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not edit contact - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not edit contact - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const addContactInteraction = ({ id, interactionType }) => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    const response = loggedIn ? await jsonFetch({
      url: `${baseUrl}/contacts/interaction`,
      method: 'POST',
      body: JSON.stringify({ userName, password, id, interactionType })
    }) : { status: 200 };
    if (response.status === 200) {
      dispatch(addContactInteractionDone({ id, interactionType }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not update interaction - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not update interaction - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}