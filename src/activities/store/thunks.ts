import { v4 } from 'uuid';
import { updateActivityDone, deleteActivityDone } from '@activities/store';

export const addActivity = (activity) => async (dispatch) => {
  const newActivityId = v4();
  dispatch(updateActivityDone({ id: newActivityId, ...activity }))
}

export const editActivity = (activityId, updatedActivity) => async (dispatch) => {
  dispatch(updateActivityDone({ id: activityId, ...updatedActivity }))
}

export const deleteActivity = (activityId) => async (dispatch) => {
  dispatch(deleteActivityDone({ id: activityId }))
}