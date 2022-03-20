import { Dispatch } from 'redux';
import { v4 } from 'uuid';
// Actions
import { setActivities, updateActivityDone, deleteActivityDone } from 'activities/store';
// Constants
import baseUrl from '@core/baseUrl';
import STATUS_CODES from '@core/constants/statusCodes';
// Utils
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
// Types
import { GetState, RequestOptions } from '@core/types';
import { Activity } from 'activities/types';

export const getActivities = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${baseUrl}/activities/get`,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not get activities"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setActivities,
    {}
  );
}

// TODO - Rename to createActivity
export const addActivity = (activity: Activity) => async (dispatch: Dispatch, getState: GetState) => {
  const activityId: string = v4();
  const params = { activityId, activity };
  const options: RequestOptions = {
    url: `${baseUrl}/activities/create`,
    params,
    acceptedStatusCode: STATUS_CODES.CREATED,
    errorMessage: "Could not create activity"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateActivityDone,
    params
  );
}

// TODO - Rename to updateActivity
export const editActivity = (activityId: string, activity: Activity) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { activityId, activity };
  const options: RequestOptions = {
    url: `${baseUrl}/activities/update`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not update activity"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateActivityDone,
    params
  );
}

export const deleteActivity = (activityId: string) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { activityId };
  const options: RequestOptions = {
    url: `${baseUrl}/activities/delete`,
    params,
    acceptedStatusCode: STATUS_CODES.OK,
    errorMessage: "Could not delete activity"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteActivityDone,
    params
  );
}