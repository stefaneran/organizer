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

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  nutrition: NutritionalInfo[];
}

export type InventoryItemEdit = Omit<InventoryItem, "id">;

export interface InventoryActions {
  inventory: {
    addToAll: ReduxProps["addToAllItems"];
    removeFromAll: ReduxProps["removeFromAllItems"];
    addToAvailable: ReduxProps["addToAvailable"];
    removeFromAvailable: ReduxProps["removeFromAvailable"];
    edit: ReduxProps["editItem"];
  },
  cart: {
    add: ReduxProps["addToCart"];
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