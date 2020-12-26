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
    availableItems: ['1', '2', '6'],
    cart: ['3', '5'],
    selectedInCart: []
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
      const { itemIds } = payload;
      itemIds.forEach(itemId => {
        if (!state.availableItems.includes(itemId)) {
          state.availableItems.push(itemId);
        }
      })
    },
    removeFromAvailableDone: (state, { payload }) => {
      const { id } = payload;
      state.availableItems.filter(itemId => itemId !== id);
    },
    getCartDone: (state, { payload }) => {
      state.cart = payload;
    },
    addToCartDone: (state, { payload }) => {
      const { itemIds } = payload;
      itemIds.forEach(itemId => {
        if (!state.cart.includes(itemId)) {
          state.cart.push(itemId);
        }
      })
    },
    removeFromCartDone: (state, { payload }) => {
      const { id } = payload;
      state.cart.filter(itemId => itemId !== id);
    },
    updateSelectedInCartDone: (state, { payload }) => {
      const { selected } = payload;
      state.selectedInCart = selected;
    },
    finishShoppingDone: (state) => {
      state.cart.forEach(itemId => {
        if (!state.availableItems.includes(itemId)) {
          state.availableItems.push(itemId)
        }
      })
      state.cart = [];
    },
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
  removeFromCartDone,
  updateSelectedInCartDone,
  finishShoppingDone
} = slice.actions;

export default slice.reducer;