import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'inventoryStore',
  initialState: {
    allItems: {
      '1': { category: 'Meats', name: 'Chicken' },
      '2': { category: 'Meats', name: 'Beef' },
      '3': { category: 'Meats', name: 'Pork' },
      '4': { category: 'Veggies', name: 'Apples' },
      '5': { category: 'Veggies', name: 'Oranges' },
      '6': { category: 'Misc', name: 'Toilet Paper' },
    },
    availableItems: ['1', '2', '4', '6'],
    cart: []
  },
  reducers: {
    getAllItemsDone: (state, { payload }) => {
      state.allItems = payload;
    },
    addToAllItemsDone: (state, { payload }) => {
      const { id, item } = payload;
      state.allItems[id] = item;
    },
    removeFromAllItemsDone: (state, { payload }) => {
      const { id } = payload;
      delete state.allItems[id];
    },
    getAvailableDone: (state, { payload }) => {
      state.availableItems = payload;
    },
    addToAvailableDone: (state, { payload }) => {
      state.availableItems.push(payload);
    },
    removeFromAvailableDone: (state, { payload }) => {
      const { id } = payload;
      state.availableItems.filter(itemId => itemId !== id);
    },
    getCartDone: (state, { payload }) => {
      state.cart = payload;
    },
    addToCartDone: (state, { payload }) => {
      state.cart.push(payload);
    },
    removeFromCartDone: (state, { payload }) => {
      const { id } = payload;
      state.cart.filter(itemId => itemId !== id);
    }
  }
});

export const {
  getAllItemsDone,
  addToAllItemsDone,
  removeFromAllItemsDone,
  getAvailableDone,
  addToAvailableDone,
  removeFromAvailableDone,
  getCartDone,
  addToCartDone,
  removeFromCartDone
} = slice.actions;

export default slice.reducer;