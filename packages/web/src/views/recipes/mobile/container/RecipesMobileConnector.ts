import { connect, ConnectedProps } from 'react-redux';
import { addCart, getItems } from 'inventory/store/thunks';
import { getRecipes } from 'recipes/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  loggedIn: state.app.user.loggedIn,
  lastUpdate: state.recipesStore.lastUpdate,
  recipes: state.recipesStore.recipes,
  groceries: state.inventoryStore.groceries,
  inventory: state.inventoryStore.inventory,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  getItems,
  getRecipes,
  addCart
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;