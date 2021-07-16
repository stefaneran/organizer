import {
  loadingStart,
  loadingEnd,
  updateError
} from 'app/store/reducer';
import jsonFetch from 'core/utils/jsonFetch';

type Response = {
  status: number;
  data: any;
}

export default async (
  dispatch: any, 
  getState: any, 
  url: string, 
  params: any, 
  // eslint-disable-next-line @typescript-eslint/ban-types
  dispatchFunction: Function, 
  dispatchParams: any,
  errorMessage: string,
  skipWait?: boolean // Should skip waiting for response before dispatching store action
) => {
  dispatch(loadingStart());
  let response: Response = { status: 0, data: null };
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    if (skipWait) {
      dispatch(dispatchFunction(dispatchParams));
    }
    response = loggedIn ? await jsonFetch({
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
  return response;
}