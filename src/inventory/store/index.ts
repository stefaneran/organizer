import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'inventoryStore',
  initialState: {
    allItems: {},
    availableItems: [],
    cart: [],
    selectedInCart: []
  },
  reducers: {
    getAllDone: (state, { payload }) => {
      state.allItems = payload.allItems;
      state.availableItems = payload.availableItems;
      state.cart = payload.cart;
      state.selectedInCart = payload.selectedInCart;
    },
    clearInventory: state => {
      state.allItems = {};
      state.availableItems = [];
      state.cart = [];
      state.selectedInCart = [];
    },
    setItem: (state, { payload }) => {
      const { itemId, item } = payload;
      state.allItems[itemId] = item;
    },
    removeFromAllItemsDone: (state, { payload }) => {
      const { itemIds } = payload;
      itemIds.forEach(itemId => {
        delete state.allItems[itemId];
      });
      state.availableItems = state.availableItems.filter(itemId => !itemIds.includes(itemId));
      state.cart = state.cart.filter(itemId => !itemIds.includes(itemId));
      state.selectedInCart = state.selectedInCart.filter(itemId => !itemIds.includes(itemId));
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
  getAllDone,
  clearInventory,
  setItem,
  removeFromAllItemsDone,
  addToAvailableDone,
  removeFromAvailableDone,
  addToCartDone,
  removeFromCartDone,
  updateSelectedInCartDone,
  finishShoppingDone
} = slice.actions;

export default slice.reducer;