import { connect, ConnectedProps } from 'react-redux';
import { addCart } from 'inventory/store/thunks';
import { getRecipes } from 'recipes/store/thunks';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  loggedIn: state.app.user.loggedIn,
  recipes: state.recipesStore.recipes,
  groceries: state.inventoryStore.groceries,
  inventory: state.inventoryStore.inventory,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  getRecipes,
  addCart
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;