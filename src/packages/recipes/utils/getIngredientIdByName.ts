import { InventoryItemEdit } from 'inventory/types';

const getIngredientIdByName = (
  name: string, 
  allItems: Record<string, InventoryItemEdit>
): string | undefined => {
  const itemIds = Object.keys(allItems);
  for (let i = 0; i < itemIds.length; i += 1) {
    const itemId = itemIds[i];
    const itemName = allItems[itemId].name;
    if (itemName === name) {
      return itemId;
    }
  }
  return undefined;
}

export default getIngredientIdByName;