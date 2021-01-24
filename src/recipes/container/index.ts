import { connect } from 'react-redux';
import {
  addRecipe,
  editRecipe,
  removeRecipe
} from '@recipes/store/thunks';
import { addToCart } from '@inventory/store/thunks';
import RecipesContainer from './RecipesContainer';

const mapStateToProps = state => ({
  recipes: state.recipesStore.recipes,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  addRecipe,
  editRecipe,
  removeRecipe,
  addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesContainer);