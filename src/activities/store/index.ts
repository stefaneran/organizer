import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'activitiesStore',
  initialState: {
    // All individual activities serialized by UUID
    activities: {}
  },
  reducers: {
    getAllDone: (state, { payload }) => {
      state.activities = payload;
    },
    clearActivities: (state) => {
      state.activities = {};
    },
    updateActivityDone: (state, { payload }) => {
      const { id } = payload;
      state.activities[id] = { ...payload };
    },
    deleteActivityDone: (state, { payload }) => {
      const { id } = payload;
      delete state.activities[id];
    }
  }
});

export const {
  getAllDone,
  clearActivities,
  updateActivityDone,
  deleteActivityDone
} = slice.actions;

export default slice.reducer;