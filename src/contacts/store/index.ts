import { createSlice } from '@reduxjs/toolkit';

const mockContacts = {
  '1': {
    name: 'Stefan Milenkovic',
    location: 'Sofia',
    groups: ['Weirdos']
  },
  '2': {
    name: 'Nick Zviadadze',
    location: 'Tbilisi',
    groups: ['Friends', 'AUBG']
  },
  '3': {
    name: 'Nina Troncheva',
    location: 'Sofia',
    groups: ['Friends', 'Weirdos']
  }
}

const slice = createSlice({
  name: 'contactsStore',
  initialState: {
    // All individual contacts serialized by UUID
    contacts: mockContacts,
    // Array of all unique contact group names (eg: Friends, Coworkers)
    groups: []
  },
  reducers: {
    updateContactDone: (state, { payload }) => {
      const { id } = payload;
      state.contacts[id] = { ...payload }
    },
    deleteContactDone: (state, { payload }) => {
      const { id } = payload;
      delete state.contacts[id];
    }
  }
});

export const {
  updateContactDone,
  deleteContactDone
} = slice.actions;

export default slice.reducer;