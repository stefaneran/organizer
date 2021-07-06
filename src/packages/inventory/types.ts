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
  inventory: {
    addToAll: Function;
    removeFromAll: Function;
    addToAvailable: Function;
    addNewToAvailable: Function;
    removeFromAvailable: Function;
    edit: (id: string, item: Omit<InventoryItem, "id">) => void;
  },
  cart: {
    add: Function;
    addNew: Function;
    remove: Function;
    updateSelected: Function;
    finishShopping: Function;
  }
}

export interface RowIcon {
  icon: JSX.Element;
  handler: Function;
  altIcon?: JSX.Element;
}