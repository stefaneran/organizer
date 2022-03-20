import { Dispatch } from 'redux';
import {
  loadingStart,
  loadingEnd,
  updateError,
  refreshLastUpdateValue
} from 'app/store/reducer';
import jsonFetch from '@core/utils/jsonFetch';
import { GetState, RequestOptions } from '@core/types';

type Response = {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

async function genericRequest(
  dispatch: Dispatch, 
  getState: GetState, 
  options: RequestOptions
) {
  dispatch(loadingStart());
  const { url, acceptedStatusCode, params, errorMessage } = options;
  let response: Response = { status: 0, data: null };
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    console.log(loggedIn)
    // We make no request if not loggedIn to allow non-loggedIn users to play around with the app
    response = loggedIn ? await jsonFetch({
      url,
      method: 'POST',
      body: JSON.stringify({ userName, password, ...params })
    }) : { status: 200, data: {} };
    if (response.status !== acceptedStatusCode) {
      const message = `Response Status ${response.status}`;
      throw new Error(message);
    }
  } catch (e) {
    dispatch(updateError({
      active: true,
      message: `${errorMessage} - ${e.message}`
    }));
  }
  dispatch(loadingEnd());

  if (response.data?.lastUpdate) {
    dispatch(refreshLastUpdateValue(response.data.lastUpdate))
  }
  return response;
}

export default genericRequest;