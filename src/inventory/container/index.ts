import { connect } from 'react-redux';
import {
  getAllItems,
  addToAllItems,
  removeFromAllItems,
  getAvailable,
  addToAvailable,
  addNewToAvailable,
  removeFromAvailable,
  getCart,
  addToCart,
  addNewToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
} from '@inventory/store/thunks';
import InventoryContainer from './InventoryContainer';

const mapStateToProps = state => ({
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart,
  selectedInCart: state.inventoryStore.selectedInCart
});

const mapDispatchToProps = {
  getAllItems,
  addToAllItems,
  removeFromAllItems,
  getAvailable,
  addToAvailable,
  addNewToAvailable,
  removeFromAvailable,
  getCart,
  addToCart,
  addNewToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryContainer);