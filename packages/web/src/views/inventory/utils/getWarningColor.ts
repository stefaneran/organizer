import { InventoryItem } from 'inventory/types';
import { warningYellow, warningRed } from 'inventory/constants/warningColor';

const isItemAvailable = (item: InventoryItem, availableItems: string[]): boolean => 
  item ? availableItems.includes(item.id) : false;
const isItemInCart = (item: InventoryItem, cart: string[]): boolean => 
  item ? cart.includes(item.id) : false;

const getWarningColor = (
  item: InventoryItem, 
  cart: string[], 
  availableItems: string[]
): string => {
  if (!item) {
    return '';
  }
  // If item missing from inventory, but is in cart
  if (!isItemAvailable(item, availableItems) && isItemInCart(item, cart)) {
    // Return yellow
    return warningYellow;
  }
  // If item is missing
  else if (!isItemAvailable(item, availableItems)) {
    // Return red
    return warningRed;
  }
  return '';
}

export default getWarningColor;