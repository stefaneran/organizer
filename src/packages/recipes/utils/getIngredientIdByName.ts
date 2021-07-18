import { InventoryItemEdit } from 'inventory/types';

const getIngredientIdByName = (
  name: string, 
  allItems: Record<string, InventoryItemEdit>
): string | undefined => {
  const items = Object.entries(allItems);
  for (const [id, item] of items) {
    const itemName = item.name;
    if (itemName === name) {
      return id;
    }
  }
  return undefined;
}

export default getIngredientIdByName;