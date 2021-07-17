import { connect, ConnectedProps } from 'react-redux';
import {
  removeFromAvailable,
  addToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
} from 'inventory/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart,
  selectedInCart: state.inventoryStore.selectedInCart
});

const mapDispatchToProps = {
  removeFromAvailable,
  addToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  removeFromAvailable: ReduxProps["removeFromAvailable"],
  addToCart: ReduxProps["addToCart"],
  removeFromCart: ReduxProps["removeFromCart"],
  updateSelectedInCart: ReduxProps["updateSelectedInCart"],
  finishShopping: ReduxProps["finishShopping"]
}