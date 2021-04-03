import { updateContactDone, deleteContactDone } from '.';
import { v4 } from 'uuid';

export const createContact = (contact) => async (dispatch) => {
  const newContactId = v4();
  dispatch(updateContactDone({ id: newContactId, ...contact }));
}

export const editContact = (contactId, contact) => async (dispatch) => {
  console.log(contact)
  dispatch(updateContactDone({ id: contactId, ...contact }));
}

export const deleteContact = (contactId) => async (dispatch) => {
  dispatch(deleteContactDone({ id: contactId }));
}