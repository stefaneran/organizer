import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    version: '1.0.0',
    isLoading: false,
    isMobile: false,
    user: {
      userName: '',
      password: '',
      loggedIn: false
    },
    error: {
      active: false,
      message: 'Unknown Error'
    }
  },
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingEnd: (state) => {
      state.isLoading = false;
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
    loginDone: (state, { payload }) => {
      state.user.loggedIn = true;
      state.user.userName = payload.userName;
      state.user.password = payload.password;
    },
    logoutDone: (state) => {
      state.user.loggedIn = false;
      state.user.userName = '';
      state.user.password = '';
    }
  }
});

export const {
  loadingStart,
  loadingEnd,
  setIsMobile,
  updateError,
  loginDone,
  logoutDone
} = slice.actions;

export default slice.reducer;