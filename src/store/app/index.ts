import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    version: '1.3.1',
    loading: false,
    error: {
      active: false,
      message: 'Unknown Error'
    },
    loggedIn: false,
    userName: null,
    password: null // TODO CHANGE
  },
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    loadingEnd: (state) => {
      state.loading = false;
    },
    updateError: (state, { payload }) => {
      state.error = {
        active: !payload.success,
        message: ''
      }
    },
    loginDone: (state, { payload }) => {
      state.loggedIn = true;
      state.userName = payload.userName;
      state.password = payload.password;
    },
    logoutDone: (state) => {
      state.loggedIn = false;
      state.userName = null;
      state.password = null;
    },
    // Validate data for any missing properties that were added during development
    /* validateData: (state) => {
      const { skills } = state.data;
      // Iterate through skills
      skills.forEach(skill => {
        // Iterate through model
        Object.keys(skillModel).forEach(property => {
          if(!skill[property]) {
            skill[property] = skillModel[property];
          }
        });
      })
    }, */
  }
});

export const {
  loadingStart,
  loadingEnd,
  updateError,
  loginDone,
  logoutDone
} = slice.actions;

export default slice.reducer;