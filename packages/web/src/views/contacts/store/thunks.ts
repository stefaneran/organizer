import { Dispatch } from 'redux';
import { v4 } from 'uuid';
// Actions
import {
  setContactsAndEvents,
  updateContactDone, 
  deleteContactDone,
  updateLastContactDone,
  updateEventDone,
  deleteEventDone
} from '.';
import { setActivities } from 'activities/store';
// Constants
import baseUrl from '@core/baseUrl';
import STATUS_CODES from '@core/constants/statusCodes';
// Utils
import genericRequest from '@core/utils/genericRequest';
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
// Types
import { GetState, RequestOptions } from '@core/types';

export const getContactsAndEvents = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${baseUrl}/contacts/get`,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not get contact and events"
  }
  const response = await genericRequest(
    dispatch,
    getState,
    options
  )
  dispatch(setContactsAndEvents(response.data))
  dispatch(setActivities(response.data.activities))
}

export const createContact = (contact) => async (dispatch: Dispatch, getState: GetState) => {
  const contactId = v4();
  const params = { contactId, contact };
  const options: RequestOptions = {
    url: `${baseUrl}/contacts/create`,
    params,
    acceptedStatusCode: STATUS_CODES.CREATED,
    errorMessage: "Could not create contact"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateContactDone,
    params
  );
}

// TODO - Rename to updateContact
export const editContact = (contactId, contact) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { contactId, contact };
  const options: RequestOptions = {
    url: `${baseUrl}/contacts/update`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update contact"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateContactDone,
    params
  );
}

export const deleteContact = (contactId) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { contactId };
  const options: RequestOptions = {
    url: `${baseUrl}/contacts/delete`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not delete contact"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteContactDone,
    params
  );
}

export const updateLastContact = (contactId) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { contactId };
  const options: RequestOptions = {
    url: `${baseUrl}/contacts/updateLast`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update last contact"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateLastContactDone,
    params
  );
}

export const createEvent = (event) => async (dispatch: Dispatch, getState: GetState) => {
  const eventId = v4();
  const params = { eventId, event };
  const options: RequestOptions = {
    url: `${baseUrl}/events/create`,
    params,
    acceptedStatusCode: STATUS_CODES.CREATED,
    errorMessage: "Could not create event"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateEventDone,
    params
  );
}

// TODO - Rename to updateEvent
export const editEvent = (eventId, event) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { eventId, event };
  const options: RequestOptions = {
    url: `${baseUrl}/events/update`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update event"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateEventDone,
    params
  );
}

export const deleteEvent = (eventId) => async (dispatch: Dispatch, getState: GetState) => {
  dispatch(deleteEventDone({ eventId }));
  const params = { eventId };
  const options: RequestOptions = {
    url: `${baseUrl}/events/delete`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not delete event"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteEventDone,
    params
  );
}