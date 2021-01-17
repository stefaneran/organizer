import { connect } from 'react-redux';
import { addToCart } from '@inventory/store/thunks';
import { getAllRecipes } from '@recipes/store/thunks';
import RecipesMobileContainer from './RecipesMobileContainer';

const mapStateToProps = state => ({
  loggedIn: state.app.user.loggedIn,
  recipes: state.recipesStore.recipes,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  getAllRecipes,
  addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesMobileContainer);