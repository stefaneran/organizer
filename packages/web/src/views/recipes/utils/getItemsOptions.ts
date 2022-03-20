import { GroceryItemEdit } from 'inventory/types';

const getItemsOptions = (
  ingredientName: string, 
  groceries: Record<string, GroceryItemEdit>
): string[] => {
  const itemNames: string[] = [];
  Object.keys(groceries).forEach(itemId => {
    const { name } = groceries[itemId];
    const containsValue = ingredientName?.length ?
      name.toLowerCase().includes(ingredientName.toLowerCase()) : true;
    if (!itemNames.includes(name) && containsValue) {
      itemNames.push(name);
    }
  })
  return itemNames;
}

export default getItemsOptions;