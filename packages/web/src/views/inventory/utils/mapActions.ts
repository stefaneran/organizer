import { InventoryActions } from 'inventory/types';
import { DispatchProps } from 'inventory/container/InventoryConnector';

// When called from mobile version, will contain only a few of all actions, hence the Partial
const mapActions = (actionProps: Partial<DispatchProps>): InventoryActions => ({
  inventory: {
    addToAll: actionProps.addToAllItems,
    removeFromAll: actionProps.removeFromAllItems,
    addToAvailable: actionProps.addToAvailable,
    removeFromAvailable: actionProps.removeFromAvailable,
    edit: actionProps.editItem
  },
  cart: {
    add: actionProps.addToCart,
    remove: actionProps.removeFromCart,
    updateSelected: actionProps.updateSelectedInCart,
    finishShopping: actionProps.finishShopping
  }
})

export default mapActions;