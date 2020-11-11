import { createSlice } from '@reduxjs/toolkit';
import InteractionType from '@contacts/interfaces/InteractionType.interface';

const slice = createSlice({
  name: 'contactsStore',
  initialState: {
    // All individual contacts serialized by UUID
    contacts: {},
    // Array of all unique contact group names (eg: Friends, Coworkers)
    groups: []
  },
  reducers: {
    createContactDone: (state, { payload }) => {
      const { newId, contact } = payload;
      const { contacts } = state;
      contacts[newId] = contact;
    },
    editContactDone: (state, { payload }) => {
      const { id, property, value } = payload;
      const { contacts } = state;
      contacts[id][property] = value;
    },
    deleteContactDone: (state, { payload }) => {
      const { id } = payload;
      const { contacts } = state;
      delete contacts[id];
    },
    addContactInteractionDone: (state, { payload }) => {
      const { id, interactionType } = payload;
      const { contacts } = state;
      const contact = contacts[id];
      const now = Date.now();
      if (interactionType === InteractionType.Hangout) {
        contact.hangouts.push(now);
      }
      contact.lastInteraction = now;
    },
    updateGroups: (state, { payload }) => {
      state.groups = payload;
    }
  }
});

export const {
  createContactDone,
  editContactDone,
  deleteContactDone,
  addContactInteractionDone,
  updateGroups
} = slice.actions;

export default slice.reducer;