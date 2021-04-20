import { createSlice } from '@reduxjs/toolkit';

const mockActivities = {
  '1': {
    name: 'Paintball',
    locations: [{ name: 'Parking Garage', address: 'ul. "Uoshbarn" 31' }],
    activityType: "Sport",
    participantType: ["Group"]
  },
  '2': {
    name: 'Mexican Food',
    locations: [
      { name: 'Carlos\' Mexican Restaurant', address: 'ul. "Vidini kuli" 2' },
      { name: 'Rodrigo\'s Chilli Fiesta', address: 'ul. "Filip Totyu" 13' }
    ],
    activityType: "Food",
    participantType: ["Group", "Pair", "Alone"]
  }
}

const slice = createSlice({
  name: 'activitiesStore',
  initialState: {
    // All individual activities serialized by UUID
    activities: mockActivities
  },
  reducers: {
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
  updateActivityDone,
  deleteActivityDone
} = slice.actions;

export default slice.reducer;