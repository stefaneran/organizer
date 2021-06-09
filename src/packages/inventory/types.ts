export enum InventoryTabs {
  Cart = "Cart",
  Inventory = "Inventory"
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
}

export interface InventoryActions {
  recipes: {
    removeIngredient: Function;
  },
  inventory: {
    addToAll: Function;
    removeFromAll: Function;
    addToAvailable: Function;
    addNewToAvailable: Function;
    removeFromAvailable: Function;
    edit: Function;
  },
  cart: {
    add: Function;
    addNew: Function;
    remove: Function;
    updateSelected: Function;
    finishShopping: Function;
  }
}

export interface IconAction {
  icon: JSX.Element;
  handler: Function;
  isDelete?: boolean; // One time exception
}