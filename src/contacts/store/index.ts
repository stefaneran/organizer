import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {}
  },
  reducers: {
    createContactDone: (state, { payload }) => {
      const { contact } = payload;
      const { contacts } = state;
      contacts.push(contact);
    },
    addContactInteractionDone: (state, { payload }) => {
      const { contactName, log } = payload;
      const { contacts } = state;
      const contact = contacts.find(contact => contact.name === contactName);
      contact.interactionHistory.push(log);
      contact.lastActivity = Date.now();
    },
    editContactSubgroupDone: (state, { payload }) => {
      const { selectedContact, newSubgroups } = payload;
      const { contacts } = state;
      const contact = contacts.find(contact => contact.name === selectedContact.name);
      contact.subgroups = newSubgroups;
    }
  }
});

export const {
  createContactDone,
  addContactInteractionDone,
  editContactSubgroupDone
} = slice.actions;

export default slice.reducer;