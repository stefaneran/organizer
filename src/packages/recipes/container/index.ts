import { connect } from 'react-redux';
import {
  addRecipe,
  editRecipe,
  deleteRecipe
} from '@recipes/store/thunks';
import { addToCart } from '@inventory/store/thunks';
import RecipesContainer from './RecipesContainer';
import { AppStore } from '@core/types';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesContainer);