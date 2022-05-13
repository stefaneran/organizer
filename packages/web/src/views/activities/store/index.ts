import { createSlice } from '@reduxjs/toolkit';
import { ActivitiesStore } from '@core/types';

const slice = createSlice({
  name: 'activitiesStore',
  initialState: {
    // All individual activities serialized by UUID
    activities: {},
    // Last time there was an update in activities
    lastUpdate: 0
  } as ActivitiesStore,
  reducers: {
    setActivities: (state: ActivitiesStore, { payload }) => {
      state.activities = payload;
    },
    clearActivities: (state: ActivitiesStore) => {
      state.activities = {};
      state.lastUpdate = 0;
    },
    updateActivityDone: (state: ActivitiesStore, { payload }) => {
      const { activityId, activity } = payload;
      state.activities[activityId] = activity;
    },
    deleteActivityDone: (state: ActivitiesStore, { payload }) => {
      const { activityId } = payload;
      delete state.activities[activityId];
    },
    setLastActivityUpdate: (state: ActivitiesStore, { payload }) => {
      state.lastUpdate = Number(payload);
    }
  }
});

export const {
  setActivities,
  clearActivities,
  updateActivityDone,
  deleteActivityDone,
  setLastActivityUpdate
} = slice.actions;

export default slice.reducer;