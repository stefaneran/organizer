import { connect, ConnectedProps } from 'react-redux';
import {
  getItems,
  removeInventory,
  addCart,
  removeCart,
  updateCartSelected,
  finishShopping
} from 'inventory/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  loggedIn: state.app.user.loggedIn,
  lastUpdate: state.inventoryStore.lastUpdate,
  groceries: state.inventoryStore.groceries,
  inventory: state.inventoryStore.inventory,
  cart: state.inventoryStore.cart,
  cartSelected: state.inventoryStore.cartSelected
});

const mapDispatchToProps = {
  getItems,
  removeInventory,
  addCart,
  removeCart,
  updateCartSelected,
  finishShopping
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  getItems: ReduxProps["getItems"],
  removeFromAvailable: ReduxProps["removeInventory"],
  addToCart: ReduxProps["addCart"],
  removeFromCart: ReduxProps["removeCart"],
  updateSelectedInCart: ReduxProps["updateCartSelected"],
  finishShopping: ReduxProps["finishShopping"]
}