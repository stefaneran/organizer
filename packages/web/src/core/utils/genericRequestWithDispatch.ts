import { Dispatch } from 'redux';
import genericRequest from '@core/utils/genericRequest';
import { GetState, RequestOptions } from '@core/types';

async function genericRequestWithDispatch(
  dispatch: Dispatch, 
  getState: GetState, 
  options: RequestOptions, 
  // eslint-disable-next-line @typescript-eslint/ban-types
  dispatchFunction: Function, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchParams: any,
  skipAwait?: boolean // Should skip waiting for response before dispatching store action
) {
  if (skipAwait) {
    dispatch(dispatchFunction(dispatchParams));
  }
  const response = await genericRequest(dispatch, getState, options);
  if (dispatchFunction && !skipAwait) {
    const hasDispatchParams = Boolean(Object.keys(dispatchParams).length);
    dispatch(dispatchFunction(hasDispatchParams ? dispatchParams : response.data));
  }
  return response;
}

export default genericRequestWithDispatch;