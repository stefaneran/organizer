import { Dispatch } from 'redux';
import { v4 } from 'uuid';
// Actions
import { setActivities, updateActivityDone, deleteActivityDone } from 'activities/store';
// Constants
import baseUrl from '@core/baseUrl';
import STATUS from '@core/constants/statusCodes';
// Utils
import genericRequestWithDispatch from '@core/utils/genericRequestWithDispatch';
import { saveModuleStoreDataToLocalStorage } from '@core/localstorage/store';
import { setModuleLastUpdateInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { GetState, RequestOptions, OrganizerModule } from '@core/types';
import { Activity } from 'activities/types';

export const getActivities = () => async (dispatch: Dispatch, getState: GetState) => {
  const options: RequestOptions = {
    url: `${baseUrl}/activities/get`,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not get activities"
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    setActivities,
    {}
  );
  saveModuleStoreDataToLocalStorage(getState, OrganizerModule.Activities);
}

// TODO - Rename to createActivity
export const addActivity = (activity: Activity) => async (dispatch: Dispatch, getState: GetState) => {
  const activityId: string = v4();
  const params = { activityId, activity };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${baseUrl}/activities/create`,
    params,
    acceptedStatusCode: STATUS.CREATED,
    errorMessage: "Could not create activity",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateActivityDone,
    params,
    OrganizerModule.Activities
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Activities);
}

// TODO - Rename to updateActivity
export const editActivity = (activityId: string, activity: Activity) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { activityId, activity };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${baseUrl}/activities/update`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not update activity",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    updateActivityDone,
    params,
    OrganizerModule.Activities
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Activities);
}

export const deleteActivity = (activityId: string) => async (dispatch: Dispatch, getState: GetState) => {
  const params = { activityId };
  const timestamp = Date.now();
  const options: RequestOptions = {
    url: `${baseUrl}/activities/delete`,
    params,
    acceptedStatusCode: STATUS.OK,
    errorMessage: "Could not delete activity",
    timestamp
  }
  await genericRequestWithDispatch(
    dispatch,
    getState,
    options,
    deleteActivityDone,
    params,
    OrganizerModule.Activities
  );
  setModuleLastUpdateInLocalStorage(timestamp, OrganizerModule.Activities);
}