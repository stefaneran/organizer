import {
  loadingStart,
  loadingEnd,
  updateError
} from '@app/store/reducer';
import jsonFetch from '@core/utils/jsonFetch';

export default async (
  dispatch: any, 
  getState: any, 
  url: string, 
  params: any, 
  dispatchFunction: Function, 
  dispatchParams: any,
  errorMessage: string,
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
      message: `${errorMessage} - ${e}`
    }));
  }
  dispatch(loadingEnd());
}