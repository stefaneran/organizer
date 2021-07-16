// @ts-nocheck
import { Dispatch } from 'redux';
import {
  updateContactDone, 
  deleteContactDone,
  updateLastContactDone,
  updateEventDone,
  deleteEventDone
} from '.';
import baseUrl from 'core/baseUrl';
import { v4 } from 'uuid';
import genericRequest from 'core/utils/genericRequest';
import { GetState } from 'core/types';

export const createContact = (contact) => async (dispatch: Dispatch, getState: GetState) => {
  const newContactId = v4();
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/create`,
    { newId: newContactId, contact },
    updateContactDone,
    { id: newContactId, contact },
    `Could not create contact`
  );
}

export const editContact = (contactId, contact) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/edit`,
    { id: contactId, contact },
    updateContactDone,
    { id: contactId, contact },
    `Could not edit contact`
  );
}

export const deleteContact = (contactId) => async (dispatch: Dispatch, getState: GetState) => {
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

export const updateLastContact = (contactId) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/contacts/updateLast`,
    { id: contactId },
    updateLastContactDone,
    { id: contactId },
    `Could not update last contact`
  );
}

export const createEvent = (event) => async (dispatch: Dispatch, getState: GetState) => {
  const newEventId = v4();
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/events/create`,
    { newId: newEventId, event },
    updateEventDone,
    { id: newEventId, event },
    `Could not create event`
  );
}

export const editEvent = (eventId, event) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/events/edit`,
    { id: eventId, event },
    updateEventDone,
    { id: eventId, event },
    `Could not edit event`
  );
}

export const deleteEvent = (eventId) => async (dispatch: Dispatch, getState: GetState) => {
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