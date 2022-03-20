import { Dispatch } from 'redux';
import {
  loginDone,
  logoutDone
} from './reducer';
import baseUrl from '@core/baseUrl';
import STATUS_CODES from '@core/constants/statusCodes';
import genericRequest from '@core/utils/genericRequest';
import jsonFetch from '@core/utils/jsonFetch';
import { GetState, RequestOptions } from '@core/types';

export const register = ({ userName, password }) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { userName, password }
  try {
    const response = await jsonFetch({
      url: `${baseUrl}/app/register`,
      method: 'POST',
      body: JSON.stringify(params)
    })
    if (response.status === STATUS_CODES.CREATED) {
      dispatch(loginDone({ userName, password }))
      localStorage.setItem('user', JSON.stringify({ userName, password }));
    }
  } catch (e) {
    return;
  }
}

export const login = ({ userName, password }) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { userName, password }
  try {
    const response = await jsonFetch({
      url: `${baseUrl}/app/login`,
      method: 'POST',
      body: JSON.stringify(params)
    })
    const { lastUpdate } = response.data;
    if (response.status === STATUS_CODES.OK) {
      dispatch(loginDone({ userName, password, lastUpdate }))
      localStorage.setItem('user', JSON.stringify({ userName, password }));
    }
  } catch (e) {
    localStorage.removeItem('user');
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('user');
  dispatch(logoutDone());
}