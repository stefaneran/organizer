import {
  getAllContactsDone,
  createContactDone,
  editContactDone,
  deleteContactDone,
  addContactInteractionDone
} from '.';
import genericRequest from '@store/utils/genericRequest';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';

export const getAllContacts = () => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/getAll`,
    {},
    getAllContactsDone,
    {},
    `Could not get all contacts`
  );
}

export const createContact = ({ formData }) => async (dispatch, getState) => {
  const newId = v4();
  const contact = {
    id: newId,
    ...formData,
    info: '',
    lastInteraction: Date.now(),
    hangouts: []
  }
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/create`,
    { newId, contact },
    createContactDone,
    { newId, contact },
    `Could not create contact`
  );
}

export const deleteContact = ({ id }) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/delete`,
    { id },
    deleteContactDone,
    { id },
    `Could not delete contact`
  );
}

export const editContact = ({ id, property, value }) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/edit`,
    { id, property, value },
    editContactDone,
    { id, property, value },
    `Could not edit contact`
  );
}

export const addContactInteraction = ({ id, interactionType }) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/interaction`,
    { id, interactionType },
    addContactInteractionDone,
    { id, interactionType },
    `Could not update interaction`
  );
}

export const uploadContacts = ({ contacts }) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/upload`,
    { contacts },
    undefined,
    {},
    `Could not upload contacts from file`
  );
}