import genericSort from '@core/utils/genericSort';
import { InventoryItemEdit } from 'inventory/types';
import { Option } from '@core/types';

const getNameOptions = (
  allItems: Record<string, InventoryItemEdit>, 
  targetCollection: string[]
): Option[] => {
  const names: Option[] = [];
  Object.entries(allItems).forEach(([id, item]) => {
    if (!targetCollection.includes(id)) {
      names.push({ 
        label: item.name, 
        value: id 
      });
    }
  })
  return names.sort((a, b) => genericSort(a.label, b.label));
}

export default getNameOptions;