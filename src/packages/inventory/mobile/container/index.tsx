import { connect } from 'react-redux';
import {
  removeFromAvailable,
  addToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
} from '@inventory/store/thunks';
import InventoryMobileContainer from './InventoryMobileContainer';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  allItems: state.inventoryStore.allItems,
  availableItems: state.inventoryStore.availableItems,
  cart: state.inventoryStore.cart,
  selectedInCart: state.inventoryStore.selectedInCart
});

const mapDispatchToProps = {
  removeFromAvailable,
  addToCart,
  removeFromCart,
  updateSelectedInCart,
  finishShopping
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryMobileContainer);