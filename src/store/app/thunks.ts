import {
  loadingStart,
  loadingEnd,
  loginDone,
  logoutDone,
  updateError
} from '.';
import jsonFetch from '@store/utils/jsonFetch';

// TODO move to process.env
const baseUrlLocal = "http://localhost:5001/sem-organizer/us-central1/default";
const baseUrl = "https://us-central1-sem-organizer.cloudfunctions.net/default";

export const register = ({ userName, password }) => async (dispatch) => {
  dispatch(loadingStart());
  try {
    const response = await jsonFetch({
      url: `${baseUrl}/register`,
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
      url: `${baseUrl}/login`,
      method: 'POST',
      body: JSON.stringify({ userName, password })
    });
    if (response.status === 200) {
      dispatch(loginDone({ userName, password }))
      localStorage.setItem('user', JSON.stringify({ userName, password }));
    } else {
      dispatch(updateError({
        active: true,
        message: `Could not login - Response Status ${response.status}`
      }));
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