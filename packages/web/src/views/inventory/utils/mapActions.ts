import { InventoryActions } from 'inventory/types';
import { DispatchProps } from 'inventory/container/InventoryConnector';

// When called from mobile version, will contain only a few of all actions, hence the Partial
const mapActions = (actionProps: Partial<DispatchProps>): InventoryActions => ({
  groceries: {
    create: actionProps.createItem,
    update: actionProps.updateItem,
    delete: actionProps.deleteItems
  },
  inventory: {
    add: actionProps.addInventory,
    remove: actionProps.removeInventory,
  },
  cart: {
    add: actionProps.addCart,
    remove: actionProps.removeCart,
    updateSelected: actionProps.updateCartSelected,
    finishShopping: actionProps.finishShopping
  }
})

export default mapActions;