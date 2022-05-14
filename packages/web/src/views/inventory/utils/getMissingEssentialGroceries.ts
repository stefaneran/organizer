import { GroceryItemEdit } from 'inventory/types';

const getMissingEssentialGroceries = (
  groceries: Record<string, GroceryItemEdit>,
  inventory: string[],
  cart: string[]
) => {
  let total = 0;
  const missing = [];
  Object.entries(groceries).forEach(([id, grocery]) => {
    const isEssential = Boolean(grocery.isEssential);
    if (isEssential && !inventory.includes(id) && !cart.includes(id)) {
      total += 1;
      missing.push(id);
    }
  })
  return {
    total,
    missing
  }
}

export default getMissingEssentialGroceries;