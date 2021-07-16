import genericSort from 'core/utils/genericSort';
import { InventoryItem } from 'inventory/types';

interface Option {
  label: string;
  value: string;
}

export default (
  allItems: Record<string, InventoryItem>, 
  targetCollection: string[]
) => {
  const names: Option[] = [];
  Object.keys(allItems).forEach(id => {
    if (!targetCollection.includes(id)) {
      names.push({ 
        label: allItems[id].name, 
        value: id 
      });
    }
  })
  return names.sort((a, b) => genericSort(a.label, b.label));
}