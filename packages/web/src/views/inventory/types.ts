import { ReduxProps } from 'inventory/container/InventoryConnector';
import { UnitType } from '@core/types';

export enum InventoryTabs {
  Cart = "Cart",
  Inventory = "Inventory"
}

export interface NutritionalInfo {
  unit: UnitType;
  amount: number;
  calories: number; // Amount of kcal
  proteins: number; // Grams of proteins
  fat: number; // Grams of fat
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  nutrition: NutritionalInfo[];
}

export type GroceryItemEdit = Omit<GroceryItem, "id">;

export interface InventoryActions {
  groceries: {
    create: ReduxProps["createItem"],
    update: ReduxProps["updateItem"]
    delete: ReduxProps["deleteItems"]
  },
  inventory: {
    add: ReduxProps["addInventory"];
    remove: ReduxProps["removeInventory"];
  },
  cart: {
    add: ReduxProps["addCart"];
    remove: ReduxProps["removeCart"];
    updateSelected: ReduxProps["updateCartSelected"];
    finishShopping: ReduxProps["finishShopping"];
  }
}

export interface RowIcon {
  icon: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => void;
  altIcon?: JSX.Element;
}