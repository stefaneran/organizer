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
import STATUS from '@core/constants/statusCodes';
// Utils
import genericRequest from '@core/utils/genericRequest';
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
import { saveModuleStoreDataToLocalStorage } from '@core/localstorage/store';
import { setModuleLastUpdateInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { GetState, RequestOptions, OrganizerModule } from '@core/types';

export const getContactsAndEvents = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/contacts/get`,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not get contact and events"
  }
  const response = await genericRequest(
    dispatch,
    getState,
    options
  )
  dispatch(setContactsAndEvents(response.data))
  dispatch(setActivities(response.data.activities))
  saveModuleStoreDataToLocalStorage(getState, OrganizerModule.Contacts);
}

export const createContact = (contact) => async (dispatch: Dispatch, getState: GetState) => {
  const contactId = v4();
  const params = { contactId, contact };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/contacts/create`,
    params,
    acceptedStatusCode: STATUS.CREATED,
    errorMessage: "Could not create contact",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateContactDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}

export const editContact = (contactId, contact) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { contactId, contact };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/contacts/update`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not update contact",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateContactDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}

export const deleteContact = (contactId) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { contactId };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/contacts/delete`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not delete contact",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteContactDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}

export const updateLastContact = (contactId) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { contactId };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/contacts/updateLast`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not update last contact",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateLastContactDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}

export const createEvent = (event) => async (dispatch: Dispatch, getState: GetState) => {
  const eventId = v4();
  const params = { eventId, event };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/events/create`,
    params,
    acceptedStatusCode: STATUS.CREATED,
    errorMessage: "Could not create event",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateEventDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}

// TODO - Rename to updateEvent
export const editEvent = (eventId, event) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { eventId, event };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/events/update`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not update event",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateEventDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}

export const deleteEvent = (eventId) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { eventId };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${process.env.BASE_URL}/events/delete`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not delete event",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteEventDone,
    params,
    OrganizerModule.Contacts
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Contacts);
}