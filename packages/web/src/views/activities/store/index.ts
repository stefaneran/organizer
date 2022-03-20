import { createSlice } from '@reduxjs/toolkit';
import { ActivitiesStore } from '@core/types';

const slice = createSlice({
  name: 'activitiesStore',
  initialState: {
    // All individual activities serialized by UUID
    activities: {}
  },
  reducers: {
    setActivities: (state: ActivitiesStore, { payload }) => {
      state.activities = payload;
    },
    clearActivities: (state: ActivitiesStore) => {
      state.activities = {};
    },
    updateActivityDone: (state: ActivitiesStore, { payload }) => {
      const { activityId, activity } = payload;
      state.activities[activityId] = activity;
    },
    deleteActivityDone: (state: ActivitiesStore, { payload }) => {
      const { activityId } = payload;
      delete state.activities[activityId];
    }
  }
});

export const {
  setActivities,
  clearActivities,
  updateActivityDone,
  deleteActivityDone
} = slice.actions;

export default slice.reducer;