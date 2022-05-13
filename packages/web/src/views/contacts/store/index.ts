import { createSlice } from '@reduxjs/toolkit';
import getAllGroups from 'contacts/utils/getAllGroups';
import { ContactsStore } from '@core/types';

const slice = createSlice({
  name: 'contactsStore',
  initialState: {
    // All individual contacts serialized by UUID
    contacts: {},
    // All events (past and future) serialized by UUID
    events: {},
    // Array of all unique group names (eg: Friends, Coworkers) derived from contacts
    groups: [],
    // Last time there was an update in contacts
    lastUpdate: 0
  },
  reducers: {
    setContactsAndEvents: (state: ContactsStore, { payload }) => {
      state.contacts = payload.contacts;
      state.events = payload.events;
      if (payload.groups) {
        state.groups = payload.groups;
      }
    },
    clearContactsAndEvents: (state: ContactsStore) => {
      state.contacts = {};
      state.events = {};
      state.groups = [];
      state.lastUpdate = 0;
    },
    initGroups: (state: ContactsStore) => {
      state.groups = getAllGroups(state.contacts);
    },
    updateContactDone: (state: ContactsStore, { payload }) => {
      const { contactId, contact } = payload;
      state.contacts[contactId] = { ...contact };
      state.groups = getAllGroups(state.contacts);
    },
    updateLastContactDone: (state: ContactsStore, { payload }) => {
      const { contactId } = payload;
      state.contacts[contactId].lastContact = Date.now();
    },
    deleteContactDone: (state: ContactsStore, { payload }) => {
      const { contactId } = payload;
      delete state.contacts[contactId];
    },
    updateEventDone: (state: ContactsStore, { payload }) => {
      const { eventId, event } = payload;
      state.events[eventId] = { ...event };
    },
    deleteEventDone: (state: ContactsStore, { payload }) => {
      const { eventId } = payload;
      delete state.events[eventId];
    },
    setLastContactUpdate: (state: ContactsStore, { payload }) => {
      state.lastUpdate = Number(payload);
    }
  }
});

export const {
  setContactsAndEvents,
  clearContactsAndEvents,
  initGroups,
  updateContactDone,
  updateLastContactDone,
  deleteContactDone,
  updateEventDone,
  deleteEventDone,
  setLastContactUpdate
} = slice.actions;

export default slice.reducer;