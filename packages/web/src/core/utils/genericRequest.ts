import { Dispatch } from 'redux';
import {
  loadingStart,
  loadingEnd,
  updateError
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
  const { url, acceptedStatusCode, params, errorMessage, timestamp } = options;
  let response: Response = { status: 0, data: null };
  try {
    const { app: { user } } = getState();
    const { userName, password, loggedIn } = user;
    // We make no request if not loggedIn to allow non-loggedIn users to play around with the app
    response = loggedIn ? await jsonFetch({
      url,
      method: 'POST',
      body: JSON.stringify({ 
        userName, 
        password, 
        // Will be used for APIs that make changes and log the timestamp of the update, we send it so the latency doesn't break sync
        updateTimestamp: timestamp, 
        ...params 
      })
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
  return response;
}

export default genericRequest;