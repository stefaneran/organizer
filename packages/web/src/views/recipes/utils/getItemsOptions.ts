import { InventoryItemEdit } from 'inventory/types';

const getItemsOptions = (
  ingredientName: string, 
  allItems: Record<string, InventoryItemEdit>
): string[] => {
  const itemNames: string[] = [];
  Object.keys(allItems).forEach(itemId => {
    const { name } = allItems[itemId];
    const containsValue = ingredientName?.length ?
      name.toLowerCase().includes(ingredientName.toLowerCase()) : true;
    if (!itemNames.includes(name) && containsValue) {
      itemNames.push(name);
    }
  })
  return itemNames;
}

export default getItemsOptions;