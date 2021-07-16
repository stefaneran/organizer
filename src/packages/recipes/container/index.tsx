import { connect, ConnectedProps } from 'react-redux';
import {
  addRecipe,
  editRecipe,
  deleteRecipe
} from 'recipes/store/thunks';
import { addToCart } from 'inventory/store/thunks';
import { AppStore } from 'core/types';

const mapStateToProps = (state: AppStore) => ({
  recipes: state.recipesStore.recipes,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  addRecipe,
  editRecipe,
  deleteRecipe,
  addToCart
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  addRecipe: ReduxProps["addRecipe"],
  editRecipe: ReduxProps["editRecipe"],
  deleteRecipe: ReduxProps["deleteRecipe"],
  addToCart: ReduxProps["addToCart"]
}