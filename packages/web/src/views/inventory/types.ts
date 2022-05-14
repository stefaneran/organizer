export enum InventoryTabs {
  Cart = "Cart",
  Inventory = "Inventory"
}

export enum SelectedInventory {
  All = "all",
  Available = "available"
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  isEssential: boolean;
}

export type GroceryItemEdit = Omit<GroceryItem, "id">;

export interface RowIcon {
  icon: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => void;
  altIcon?: JSX.Element;
}