import { connect, ConnectedProps } from 'react-redux';
import {
  getRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe
} from 'recipes/store/thunks';
import { addCart } from 'inventory/store/thunks';
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
  addRecipe,
  editRecipe,
  deleteRecipe,
  addCart
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  getRecipes: ReduxProps["getRecipes"],
  addRecipe: ReduxProps["addRecipe"],
  editRecipe: ReduxProps["editRecipe"],
  deleteRecipe: ReduxProps["deleteRecipe"],
  addCart: ReduxProps["addCart"]
}