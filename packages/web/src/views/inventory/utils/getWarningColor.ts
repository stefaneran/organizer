import { GroceryItem } from 'inventory/types';
import { RED_COLOR, YELLOW_COLOR } from '@core/constants/colors';

const isItemAvailable = (item: GroceryItem, inventory: string[]): boolean =>
  item ? inventory.includes(item.id) : false;
const isItemInCart = (item: GroceryItem, cart: string[]): boolean =>
  item ? cart.includes(item.id) : false;

const getWarningColor = (
  item: GroceryItem,
  cart: string[],
  inventory: string[]
): string => {
  if (!item) {
    return '';
  }
  // If item missing from inventory, but is in cart
  if (!isItemAvailable(item, inventory) && isItemInCart(item, cart)) {
    // Return yellow
    return YELLOW_COLOR;
  }
  // If item is missing
  else if (!isItemAvailable(item, inventory)) {
    // Return red
    return RED_COLOR;
  }
  return '';
}

export default getWarningColor;