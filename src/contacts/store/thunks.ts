import {
  createContactDone,
  addContactInteractionDone,
  editContactSubgroupDone
} from '.';

// TODO move to process.env
const baseUrlLocal = "http://localhost:5001/sem-organizer/us-central1/default";
const baseUrl = "https://us-central1-sem-organizer.cloudfunctions.net/default";

//// ----- Contacts Thunks -----

export const createContact = ({ formData }) => async (dispatch, getState) => {
  const { data: { contacts } } = getState();
  const { name } = formData;
  const match = contacts.find(contact => contact.name === name);
  if (!match) {
    const contact = {
      ...formData,
      info: '',
      lastActivity: null,
      interactionHistory: []
    }
    dispatch(createContactDone({ contact }));
  }
}

export const addContactInteraction = ({ contactName, interactionType }) => async dispatch => {
  const log = {
    type: interactionType,
    activityDate: Date.now()
  }
  dispatch(addContactInteractionDone({ contactName, log }));
}