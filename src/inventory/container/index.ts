import { connect } from 'react-redux';
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
} from '@inventory/store/thunks';
import { removeIngredient } from '@recipes/store';
import InventoryContainer from './InventoryContainer';

const mapStateToProps = state => ({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryContainer);