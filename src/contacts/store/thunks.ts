import { 
  updateContactDone, 
  deleteContactDone,
  updateEventDone,
  deleteEventDone
} from '.';
import { v4 } from 'uuid';

export const createContact = (contact) => async (dispatch) => {
  const newContactId = v4();
  dispatch(updateContactDone({ id: newContactId, ...contact }));
}

export const editContact = (contactId, contact) => async (dispatch) => {
  dispatch(updateContactDone({ id: contactId, ...contact }));
}

export const deleteContact = (contactId) => async (dispatch) => {
  dispatch(deleteContactDone({ id: contactId }));
}

export const createEvent = (event) => async (dispatch) => {
  const newEventId = v4();
  dispatch(updateEventDone({ id: newEventId, ...event }));
}

export const editEvent = (eventId, event) => async (dispatch) => {
  dispatch(updateEventDone({ id: eventId, ...event }));
}

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch(deleteEventDone({ id: eventId }));
}