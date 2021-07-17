import { connect, ConnectedProps } from 'react-redux';
import {
  addToAllItems,
  editItem,
  removeFromAllItems,
  addToAvailable,
  addNewToAvailable,
  removeFromAvailable,
  addToCart,
  addNewToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
} from 'inventory/store/thunks';
import { removeIngredient } from 'recipes/store';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart,
  selectedInCart: state.inventoryStore.selectedInCart
});

const mapDispatchToProps = {
  addToAllItems,
  editItem,
  removeFromAllItems,
  addToAvailable,
  addNewToAvailable,
  removeFromAvailable,
  addToCart,
  addNewToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping,
  removeIngredient
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  addToAllItems: ReduxProps["addToAllItems"],
  editItem: ReduxProps["editItem"],
  removeFromAllItems: ReduxProps["removeFromAllItems"],
  addToAvailable: ReduxProps["addToAvailable"],
  addNewToAvailable: ReduxProps["addNewToAvailable"],
  removeFromAvailable: ReduxProps["removeFromAvailable"],
  addToCart: ReduxProps["addToCart"],
  addNewToCart: ReduxProps["addNewToCart"],
  removeFromCart: ReduxProps["removeFromCart"],
  updateSelectedInCart: ReduxProps["updateSelectedInCart"],
  finishShopping: ReduxProps["finishShopping"],
  removeIngredient: ReduxProps["removeIngredient"]
}