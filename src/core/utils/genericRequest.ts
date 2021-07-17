import { Dispatch } from 'redux';
import {
  loadingStart,
  loadingEnd,
  updateError
} from 'app/store/reducer';
import jsonFetch from 'core/utils/jsonFetch';
import { GetState } from 'core/types';

type Response = {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default async (
  dispatch: Dispatch, 
  getState: GetState, 
  url: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any, 
  // eslint-disable-next-line @typescript-eslint/ban-types
  dispatchFunction: Function, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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