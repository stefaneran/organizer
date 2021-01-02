import { connect } from 'react-redux';
import {
  getAllItems,
  getAvailable,
  removeFromAvailable,
  getCart,
  addToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
} from '@inventory/store/thunks';
import InventoryMobileContainer from './InventoryMobileContainer';

const mapStateToProps = state => ({
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart,
  selectedInCart: state.inventoryStore.selectedInCart
});

const mapDispatchToProps = {
  getAllItems,
  getAvailable,
  removeFromAvailable,
  getCart,
  addToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryMobileContainer);