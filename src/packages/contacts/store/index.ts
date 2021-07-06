import { createSlice } from '@reduxjs/toolkit';
import getAllGroups from '@contacts/utils/getAllGroups';
import { ContactsStore } from '@core/types';

const slice = createSlice({
  name: 'contactsStore',
  initialState: {
    // All individual contacts serialized by UUID
    contacts: {},
    // All events (past and future) serialized by UUID
    events: {},
    // Array of all unique group names (eg: Friends, Coworkers) derived from contacts
    groups: []
  },
  reducers: {
    setContactsAndEvents: (state: ContactsStore, { payload }) => {
      state.contacts = payload.contacts;
      state.events = payload.events;
    },
    clearContactsAndEvents: (state: ContactsStore) => {
      state.contacts = {};
      state.events = {};
    },
    initGroups: (state: ContactsStore) => {
      state.groups = getAllGroups(state.contacts);
    },
    updateContactDone: (state: ContactsStore, { payload }) => {
      const { id } = payload;
      state.contacts[id] = { ...payload };
      state.groups = getAllGroups(state.contacts);
    },
    deleteContactDone: (state: ContactsStore, { payload }) => {
      const { id } = payload;
      delete state.contacts[id];
    },
    updateEventDone: (state: ContactsStore, { payload }) => {
      const { id } = payload;
      state.events[id] = { ...payload };
    },
    deleteEventDone: (state: ContactsStore, { payload }) => {
      const { id } = payload;
      delete state.events[id];
    }
  }
});

export const {
  setContactsAndEvents,
  clearContactsAndEvents,
  initGroups,
  updateContactDone,
  deleteContactDone,
  updateEventDone,
  deleteEventDone
} = slice.actions;

export default slice.reducer;