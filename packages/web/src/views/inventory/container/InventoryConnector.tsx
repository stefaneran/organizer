import { connect, ConnectedProps } from 'react-redux';
import {
  getItems,
  createItem,
  updateItem,
  deleteItems,
  addInventory,
  removeInventory,
  addCart,
  removeCart,
  updateCartSelected,
  finishShopping
} from 'inventory/store/thunks';
import { removeIngredient } from 'recipes/store';
import { RootState } from '@core/types';

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.app.user.loggedIn,
  lastUpdate: state.inventoryStore.lastUpdate,
  groceries: state.inventoryStore.groceries,
  inventory: state.inventoryStore.inventory,
  cart: state.inventoryStore.cart,
  cartSelected: state.inventoryStore.cartSelected
});

const mapDispatchToProps = {
  getItems,
  createItem,
  updateItem,
  deleteItems,
  addInventory,
  removeInventory,
  addCart,
  removeCart,
  updateCartSelected,
  finishShopping,
  removeIngredient
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  getItems: ReduxProps["getItems"],
  createItem: ReduxProps["createItem"],
  updateItem: ReduxProps["updateItem"],
  deleteItems: ReduxProps["deleteItems"],
  addInventory: ReduxProps["addInventory"],
  removeInventory: ReduxProps["removeInventory"],
  addCart: ReduxProps["addCart"],
  removeCart: ReduxProps["removeCart"],
  updateCartSelected: ReduxProps["updateCartSelected"],
  finishShopping: ReduxProps["finishShopping"],
  removeIngredient: ReduxProps["removeIngredient"]
}