import { Dispatch } from 'redux';
import { updateActivityDone, deleteActivityDone } from 'activities/store';
import genericRequest from '@core/utils/genericRequest';
import baseUrl from '@core/baseUrl';
import { v4 } from 'uuid';
import { GetState } from '@core/types';
import { Activity } from 'activities/types';

export const addActivity = (activity: Activity) => async (dispatch: Dispatch, getState: GetState) => {
  const newActivityId: string = v4();
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/activities/create`,
    { newId: newActivityId, activity },
    updateActivityDone,
    { ...activity, id: newActivityId },
    `Could not create activity`
  );
}

export const editActivity = (activityId: string, activity: Activity) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/activities/edit`,
    { id: activityId, activity },
    updateActivityDone,
    { ...activity, id: activityId },
    `Could not edit activity`
  );
}

export const deleteActivity = (activityId: string) => async (dispatch: Dispatch, getState: GetState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/activities/delete`,
    { id: activityId },
    deleteActivityDone,
    { id: activityId },
    `Could not delete activity`
  );
}