import { createSlice } from '@reduxjs/toolkit';
import { ActivitiesStore } from 'core/types';

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
      const { id } = payload;
      state.activities[id] = { ...payload };
    },
    deleteActivityDone: (state: ActivitiesStore, { payload }) => {
      const { id } = payload;
      delete state.activities[id];
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