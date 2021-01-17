import { connect } from 'react-redux';
import {
  getAllRecipes,
  addRecipe,
  editRecipe,
  removeRecipe
} from '@recipes/store/thunks';
import { addToCart } from '@inventory/store/thunks';
import RecipesContainer from './RecipesContainer';

const mapStateToProps = state => ({
  loggedIn: state.app.user.loggedIn,
  recipes: state.recipesStore.recipes,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  getAllRecipes,
  addRecipe,
  editRecipe,
  removeRecipe,
  addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesContainer);