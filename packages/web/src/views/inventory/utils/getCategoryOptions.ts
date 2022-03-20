import genericSort from '@core/utils/genericSort';
import { GroceryItemEdit } from 'inventory/types';

const getCategoryOptions = (
  categoryValue: string, 
  groceries: Record<string, GroceryItemEdit>
): string[] => {
  const categories: string[] = [];
  Object.entries(groceries).forEach(([, item]) => {
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