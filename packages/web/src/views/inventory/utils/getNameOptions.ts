import genericSort from '@core/utils/genericSort';
import { GroceryItemEdit } from 'inventory/types';
import { Option } from '@core/types';

const getNameOptions = (
  groceries: Record<string, GroceryItemEdit>, 
  targetCollection: string[]
): Option[] => {
  const names: Option[] = [];
  Object.entries(groceries).forEach(([id, item]) => {
    if (!targetCollection.includes(id)) {
      names.push({ 
        label: item?.name, 
        value: id 
      });
    }
  })
  return names.sort((a, b) => genericSort(a.label, b.label));
}

export default getNameOptions;