import { createSlice } from '@reduxjs/toolkit';
import getAllGroups from '@contacts/utils/getAllGroups';

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
    getAllDone: (state, { payload }) => {
      state.contacts = payload.contacts;
      state.events = payload.events;
    },
    clearContactsAndEvents: (state) => {
      state.contacts = {};
      state.events = {};
    },
    initGroups: (state) => {
      state.groups = getAllGroups(state.contacts);
    },
    updateContactDone: (state, { payload }) => {
      const { id } = payload;
      state.contacts[id] = { ...payload };
      state.groups = getAllGroups(state.contacts);
    },
    deleteContactDone: (state, { payload }) => {
      const { id } = payload;
      delete state.contacts[id];
    },
    updateEventDone: (state, { payload }) => {
      const { id } = payload;
      state.events[id] = { ...payload };
    },
    deleteEventDone: (state, { payload }) => {
      const { id } = payload;
      delete state.events[id];
    }
  }
});

export const {
  getAllDone,
  clearContactsAndEvents,
  initGroups,
  updateContactDone,
  deleteContactDone,
  updateEventDone,
  deleteEventDone
} = slice.actions;

export default slice.reducer;