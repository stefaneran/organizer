import { Dispatch } from 'redux';
import {
  loadingStart,
  loadingEnd,
  loginDone,
  logoutDone,
  updateError
} from './reducer';
import jsonFetch from '@core/utils/jsonFetch';
import genericRequest from '@core/utils/genericRequest';
import baseUrl from '@core/baseUrl';

export const getAllData = () => async (dispatch: Dispatch, getState: GetState) => {
  const response = await genericRequest(
    dispatch,
    getState,
    `${baseUrl}/app/getAll`,
    {},
    undefined,
    {},
    `Could not fetch user data`
  );
  return response?.data ?? {};
}

export const register = ({ userName, password }) => async (dispatch) => {
  dispatch(loadingStart());
  try {
    const response = await jsonFetch({
      url: `${baseUrl}/app/register`,
      method: 'POST',
      body: JSON.stringify({ userName, password })
    });
    if (response.status === 200) {
      dispatch(loginDone({ userName, password }));
      localStorage.setItem('user', JSON.stringify({ userName, password }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not register - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not register - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const login = ({ userName, password }) => async (dispatch) => {
  dispatch(loadingStart());
  try {
    const response = await jsonFetch({
      url: `${baseUrl}/app/login`,
      method: 'POST',
      body: JSON.stringify({ userName, password })
    });
    if (response.status === 200) {
      dispatch(loginDone({ userName, password }))
      localStorage.setItem('user', JSON.stringify({ userName, password }));
    } else {
      localStorage.removeItem('user');
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `Could not login - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}

export const logout = () => async dispatch => {
  localStorage.removeItem('user');
  dispatch(logoutDone());
}