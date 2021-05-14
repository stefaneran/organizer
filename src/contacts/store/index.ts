import { createSlice } from '@reduxjs/toolkit';
import getAllGroups from '@contacts/utils/getAllGroups';

const mockContacts = {
  '1': {
    name: 'Stefan Milenkovic',
    location: 'Sofia',
    groups: ['Weirdos']
  },
  '2': {
    name: 'Nick Zviadadze',
    location: 'Tbilisi',
    groups: ['AUBG']
  },
  '3': {
    name: 'Nina Troncheva',
    location: 'Sofia',
    groups: ['Friends']
  }
}

const mockEvents = {
  '1': {
    participants: ['1', '2'],
    activityId: '1',
    activityLocationIndex: '0',
    date: 1919005133732
  },
  '2': {
    participants: ['1'],
    activityId: '2',
    activityLocationIndex: '0',
    date: 1919005133732
  }
}

const slice = createSlice({
  name: 'contactsStore',
  initialState: {
    // All individual contacts serialized by UUID
    contacts: mockContacts,
    // All events (past and future) serialized by UUID
    events: mockEvents,
    // Array of all unique contact group names (eg: Friends, Coworkers)
    groups: []
  },
  reducers: {
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
  initGroups,
  updateContactDone,
  deleteContactDone,
  updateEventDone,
  deleteEventDone
} = slice.actions;

export default slice.reducer;