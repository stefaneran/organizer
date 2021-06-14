import { InventoryItem } from '@inventory/types';

// Check if any items are missing from both available, and cart
// Shouldn't have a use anymore since I removed the useless "Add Missing To Cart" button
const checkItemsMissing = (
  allItems: Record<string, InventoryItem>,
  availableItems: string[], 
  cart: string[]
): boolean => {
  for (let i = 0; i < Object.keys(allItems).length; i += 1) {
    const id = Object.keys(allItems)[i];
    const isItemAvailable = availableItems.includes(id);
    const isItemInCart = cart.includes(id);
    if (!isItemAvailable && !isItemInCart) {
      return true;
    }
  }
  return false;
} 

export default checkItemsMissing;