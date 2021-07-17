import { ReduxProps } from 'inventory/container';

export enum InventoryTabs {
  Cart = "Cart",
  Inventory = "Inventory"
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
}

export type InventoryItemEdit = Omit<InventoryItem, "id">;

export interface InventoryActions {
  inventory: {
    addToAll: ReduxProps["addToAllItems"];
    removeFromAll: ReduxProps["removeFromAllItems"];
    addToAvailable: ReduxProps["addToAvailable"];
    addNewToAvailable: ReduxProps["addNewToAvailable"];
    removeFromAvailable: ReduxProps["removeFromAvailable"];
    edit: ReduxProps["editItem"];
  },
  cart: {
    add: ReduxProps["addToCart"];
    addNew: ReduxProps["addNewToCart"];
    remove: ReduxProps["removeFromCart"];
    updateSelected: ReduxProps["updateSelectedInCart"];
    finishShopping: ReduxProps["finishShopping"];
  }
}

export interface RowIcon {
  icon: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => void;
  altIcon?: JSX.Element;
}