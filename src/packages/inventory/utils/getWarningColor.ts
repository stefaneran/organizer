import { InventoryItem } from '@inventory/types';

const isItemAvailable = (item: InventoryItem, availableItems: string[]): boolean => 
  item ? availableItems.includes(item.id) : false;
const isItemInCart = (item: InventoryItem, cart: string[]): boolean => 
  item ? cart.includes(item.id) : false;

const getWarningColor = (
  item: InventoryItem, 
  cart: string[], 
  availableItems: string[]
): string => {
  // If item missing from inventory, but is in cart
  if (!isItemAvailable(item, availableItems) && isItemInCart(item, cart)) {
    // Return yellow
    return 'rgb(255, 231, 76)';
  }
  // If item is missing
  else if (!isItemAvailable(item, availableItems)) {
    // Return red
    return 'rgb(255, 89, 100)';
  }
  return '';
}

export default getWarningColor;