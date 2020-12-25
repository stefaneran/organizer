import { connect } from 'react-redux';
import {
  getAllItems,
  addToAllItems,
  removeFromAllItems,
  getAvailable,
  addToAvailable,
  removeFromAvailable,
  getCart,
  addToCart,
  removeFromCart
} from '@inventory/store/thunks';
import InventoryContainer from './InventoryContainer';

const mapStateToProps = state => ({
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart
});

const mapDispatchToProps = {
  getAllItems,
  addToAllItems,
  removeFromAllItems,
  getAvailable,
  addToAvailable,
  removeFromAvailable,
  getCart,
  addToCart,
  removeFromCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryContainer);