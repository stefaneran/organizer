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
      '6': { category: 'Misc', name: 'Toilet Paper' }
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
      const { itemIds } = payload;
      itemIds.forEach(itemId => {
        delete state.allItems[itemId];
      })
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
      const { itemIds } = payload;
      state.availableItems = state.availableItems.filter(itemId => !itemIds.includes(itemId));
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
      const { itemIds } = payload;
      state.cart = state.cart.filter(itemId => !itemIds.includes(itemId));
      state.selectedInCart = state.selectedInCart.filter(itemId => !itemIds.includes(itemId))
    },
    updateSelectedInCartDone: (state, { payload }) => {
      const { selected } = payload;
      state.selectedInCart = selected;
    },
    finishShoppingDone: (state) => {
      const onlyChecked = state.selectedInCart.length;
      state.cart.forEach(itemId => {
        const notAvailable = !state.availableItems.includes(itemId);
        const isSelected = state.selectedInCart.includes(itemId);
        if (onlyChecked && isSelected && notAvailable) {
          state.availableItems.push(itemId)
        } else if (!onlyChecked && notAvailable) {
          state.availableItems.push(itemId)
        }
      })
      if (onlyChecked) {
        state.cart = state.cart.filter(itemId => !state.selectedInCart.includes(itemId));
        state.selectedInCart = [];
      } else {
        state.cart = [];
      }
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