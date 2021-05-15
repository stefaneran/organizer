import { getAllDone, updateActivityDone, deleteActivityDone } from '@activities/store';
import genericRequest from '@store/utils/genericRequest';
import baseUrl from '@store/baseUrl';
import { v4 } from 'uuid';

export const getAllActivities = () => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/activities/getAll`,
    {},
    getAllDone,
    {},
    `Could not get all activities`
  );
}

export const addActivity = (activity) => async (dispatch, getState) => {
  const newActivityId = v4();
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/activities/create`,
    { newId: newActivityId, activity },
    updateActivityDone,
    { id: newActivityId, ...activity },
    `Could not create activity`
  );
}

export const editActivity = (activityId, activity) => async (dispatch, getState) => {
  genericRequest(
    dispatch,
    getState,
    `${baseUrl}/activities/edit`,
    { id: activityId, activity },
    updateActivityDone,
    { id: activityId, ...activity },
    `Could not edit activity`
  );
}

export const deleteActivity = (activityId) => async (dispatch, getState) => {
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