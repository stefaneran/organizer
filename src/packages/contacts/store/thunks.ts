import { 
  getAllDone,
  updateContactDone, 
  deleteContactDone,
  updateEventDone,
  deleteEventDone
} from '.';
import genericRequest from '@core/utils/genericRequest';
import baseUrl from '@core/baseUrl';
import { v4 } from 'uuid';

export const getAllContactsAndEvents = () => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/getAll`,
    {},
    getAllDone,
    {},
    `Could not get all contacts and events`
  );
}

export const createContact = (contact) => async (dispatch, getState) => {
  const newContactId = v4();
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/create`,
    { newId: newContactId, contact },
    updateContactDone,
    { id: newContactId, ...contact },
    `Could not create contact`
  );
}

export const editContact = (contactId, contact) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/edit`,
    { id: contactId, contact },
    updateContactDone,
    { id: contactId, ...contact },
    `Could not edit contact`
  );
}

export const deleteContact = (contactId) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/delete`,
    { id: contactId },
    deleteContactDone,
    { id: contactId },
    `Could not delete contact`
  );
}

export const createEvent = (event) => async (dispatch, getState) => {
  const newEventId = v4();
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/events/create`,
    { newId: newEventId, event },
    updateEventDone,
    { id: newEventId, ...event },
    `Could not create event`
  );
}

export const editEvent = (eventId, event) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/events/edit`,
    { id: eventId, event },
    updateEventDone,
    { id: eventId, ...event },
    `Could not edit event`
  );
}

export const deleteEvent = (eventId) => async (dispatch, getState) => {
  dispatch(deleteEventDone({ id: eventId }));
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/events/delete`,
    { id: eventId },
    deleteEventDone,
    { id: eventId },
    `Could not delete event`
  );
}