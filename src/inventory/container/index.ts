import { connect } from 'react-redux';
import {
  getAll,
  addToAllItems,
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
import InventoryContainer from './InventoryContainer';

const mapStateToProps = state => ({
  loggedIn: state.app.user.loggedIn,
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart,
  selectedInCart: state.inventoryStore.selectedInCart
});

const mapDispatchToProps = {
  getAll,
  addToAllItems,
  removeFromAllItems,
  addToAvailable,
  addNewToAvailable,
  removeFromAvailable,
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