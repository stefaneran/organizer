import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    version: '2.3.0',
    loading: false,
    isMobile: false,
    user: {
      userName: undefined,
      password: undefined,
      loggedIn: false,
      lastUpdate: undefined
    },
    error: {
      active: false,
      message: 'Unknown Error'
    }
  },
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    loadingEnd: (state) => {
      state.loading = false;
    },
    setIsMobile: (state, { payload }) => {
      const { isMobile } = payload;
      state.isMobile = isMobile;
    },
    updateError: (state, { payload }) => {
      const { active, message } = payload;
      state.error = {
        active,
        message
      }
    },
    refreshLastUpdateValue: (state, { payload }) => {
      state.user.lastUpdate = payload;
    },
    loginDone: (state, { payload }) => {
      state.user.loggedIn = true;
      state.user.userName = payload.userName;
      state.user.password = payload.password;
      state.user.lastUpdate = payload.lastUpdate;
    },
    logoutDone: (state) => {
      state.user.loggedIn = false;
      state.user.userName = undefined;
      state.user.password = undefined;
      state.user.lastUpdate = undefined;
    }
  }
});

export const {
  loadingStart,
  loadingEnd,
  setIsMobile,
  updateError,
  refreshLastUpdateValue,
  loginDone,
  logoutDone
} = slice.actions;

export default slice.reducer;