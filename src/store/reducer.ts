import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: true,
  categories: []
}

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    load: state => {
      state.loading = true;
      console.log('--- Loading! ---')
    }
  }
});

export const { 
  load
} = slice.actions;

export default slice.reducer;
