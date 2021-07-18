import genericSort from '@core/utils/genericSort';
import { InventoryItemEdit } from 'inventory/types';

const getCategoryOptions = (
  categoryValue: string, 
  allItems: Record<string, InventoryItemEdit>
): string[] => {
  const categories: string[] = [];
  Object.entries(allItems).forEach(([id, item]) => {
    const { category } = item;
    const containsValue = categoryValue.length ? 
      category.toLowerCase().includes(categoryValue.toLowerCase()) : true;
    if (!categories.includes(category) && containsValue) {
      categories.push(category);
    }
  })
  return categories.sort((a, b) => genericSort(a, b));
}

export default getCategoryOptions;