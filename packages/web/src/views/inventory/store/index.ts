import { createSlice } from '@reduxjs/toolkit';
import { InventoryStore } from '@core/types';

const slice = createSlice({
  name: 'inventoryStore',
  initialState: {
    // Data of grocery items (name, type, etc) serialized by ID
    groceries: {},
    // Array of grocery IDs in user's inventory
    inventory: [],
    // Array of grocery IDs in user's cart
    cart: [],
    // Array of grocery IDs in user's cart which are selected
    cartSelected: []
  },
  reducers: {

    // Set all inventory and grocery data
    setInventoryData: (state: InventoryStore, { payload }) => {
      state.groceries = payload.groceries;
      state.inventory = payload.inventory;
      state.cart = payload.cart;
      // In case of loading recipes, this will be dispatched without cartSelected
      if (payload.cartSelected) {
        state.cartSelected = payload.cartSelected;
      }
    },

    // Clear all inventory and grocery data
    clearInventoryData: (state: InventoryStore) => {
      state.groceries = {};
      state.inventory = [];
      state.cart = [];
      state.cartSelected = [];
    },

    setGroceryItem: (state: InventoryStore, { payload }) => {
      const { groceryId, groceryItem } = payload;
      state.groceries[groceryId] = groceryItem;
    },

    // Delete a grocery item and remove it from inventory/cart if present
    deleteGroceryItemDone: (state: InventoryStore, { payload }) => {
      const { groceriesIds } = payload;
      groceriesIds.forEach((groceryId: string) => {
        delete state.groceries[groceryId];
      });
      state.inventory = 
        state.inventory.filter(groceryId => !groceriesIds.includes(groceryId));
      state.cart = 
        state.cart.filter(groceryId => !groceriesIds.includes(groceryId));
      state.cartSelected = 
        state.cartSelected.filter(groceryId => !groceriesIds.includes(groceryId));
    },

    // Add one or several grocery item IDs to inventory collection
    addInventoryDone: (state: InventoryStore, { payload }) => {
      const { groceriesIds } = payload;
      groceriesIds.forEach((groceryId: string) => {
        if (!state.inventory.includes(groceryId)) {
          state.inventory.push(groceryId);
        }
      })
    },

    // Remove one or several grocery item IDs from inventory collection
    removeInventoryDone: (state: InventoryStore, { payload }) => {
      const { groceriesIds } = payload;
      state.inventory = state.inventory.filter(groceryId => !groceriesIds.includes(groceryId));
    },

    // Add one or several grocery item IDs to cart collection
    addCartDone: (state: InventoryStore, { payload }) => {
      const { groceriesIds } = payload;
      groceriesIds.forEach((groceryId: string) => {
        if (!state.cart.includes(groceryId)) {
          state.cart.push(groceryId);
        }
      })
    },

    // Remove one or several grocery item IDs from cart collection
    removeCartDone: (state: InventoryStore, { payload }) => {
      const { groceriesIds } = payload;
      state.cart = state.cart.filter(groceryId => !groceriesIds.includes(groceryId));
      state.cartSelected = state.cartSelected.filter(groceryId => !groceriesIds.includes(groceryId))
    },

    // Update which cart items are selected
    updateCartSelectedDone: (state: InventoryStore, { payload }) => {
      const { groceriesIds } = payload;
      state.cartSelected = groceriesIds;
    },

    // Add all selected cart items (or all if none selected) to the inventory
    finishShoppingDone: (state: InventoryStore) => {
      const onlyChecked = state.cartSelected.length;
      state.cart.forEach(groceryId => {
        const notAvailable = !state.inventory.includes(groceryId);
        const isSelected = state.cartSelected.includes(groceryId);
        if (onlyChecked && isSelected && notAvailable) {
          state.inventory.push(groceryId)
        } else if (!onlyChecked && notAvailable) {
          state.inventory.push(groceryId)
        }
      })
      if (onlyChecked) {
        state.cart = state.cart.filter(groceryId => !state.cartSelected.includes(groceryId));
        state.cartSelected = [];
      } else {
        state.cart = [];
      }
    },

  }
});

export const {
  setInventoryData,
  clearInventoryData,
  setGroceryItem,
  deleteGroceryItemDone,
  addInventoryDone,
  removeInventoryDone,
  addCartDone,
  removeCartDone,
  updateCartSelectedDone,
  finishShoppingDone
} = slice.actions;

export default slice.reducer;