import {
  loadingStart,
  loadingEnd,
  updateError
} from '@store/app';
import jsonFetch from '@store/utils/jsonFetch';

export default async (
  dispatch, 
  getState, 
  url, 
  params, 
  dispatchFunction, 
  dispatchParams,
  errorMessage,
  skipWait?: boolean // Should skip waiting for response before dispatching store action
) => {
  dispatch(loadingStart());
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    if (skipWait) {
      dispatch(dispatchFunction(dispatchParams));
    }
    const response = loggedIn ? await jsonFetch({
      url,
      method: 'POST',
      body: JSON.stringify({ userName, password, ...params })
    }) : { status: 200, data: {} };
    if (response.status === 200) {
      if (dispatchFunction && !skipWait) {
        const hasDispatchParams = Boolean(Object.keys(dispatchParams).length);
        dispatch(dispatchFunction(hasDispatchParams ? dispatchParams : response.data));
      }
    } else {
      dispatch(updateError({
        active: true,
        message: `${errorMessage} - Response Status ${response.status}`
      }));
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `${errorMessage} - ${e.message}`
    }));
  }
  dispatch(loadingEnd());
}