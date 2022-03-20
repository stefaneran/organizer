import { GroceryItemEdit } from 'inventory/types';

const getIngredientIdByName = (
  name: string, 
  groceries: Record<string, GroceryItemEdit>
): string | undefined => {
  const itemsObjects = Object.entries(groceries);
  for (const [id, item] of itemsObjects) {
    const itemName = item.name;
    if (itemName === name) {
      return id;
    }
  }
  return undefined;
}

export default getIngredientIdByName;