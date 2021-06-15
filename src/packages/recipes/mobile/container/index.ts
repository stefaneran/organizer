import { connect } from 'react-redux';
import { addToCart } from '@inventory/store/thunks';
import RecipesMobileContainer from './RecipesMobileContainer';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  recipes: state.recipesStore.recipes,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  addToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesMobileContainer);