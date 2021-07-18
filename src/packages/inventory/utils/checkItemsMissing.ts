import { InventoryItemEdit } from 'inventory/types';

// Check if any items are missing from both available, and cart
// Shouldn't have a use anymore since I removed the useless "Add Missing To Cart" button
const checkItemsMissing = (
  allItems: Record<string, InventoryItemEdit>,
  availableItems: string[], 
  cart: string[]
): boolean => {
  for (const id of Object.keys(allItems)) {
    const isItemAvailable = availableItems.includes(id);
    const isItemInCart = cart.includes(id);
    if (!isItemAvailable && !isItemInCart) {
      return true;
    }
  }
  return false;
} 

export default checkItemsMissing;