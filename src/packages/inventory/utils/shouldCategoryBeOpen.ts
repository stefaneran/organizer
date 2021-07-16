import { InventoryItem } from 'inventory/types';

const isSelectedItemInGroup = (
  listItems: InventoryItem[], 
  selectedItems?: string[]
): boolean => {
  for (let i = 0; i < listItems.length; i += 1) {
    if (selectedItems && selectedItems.includes(listItems[i].id)) {
      return true;
    }
  }
  return false;
}

const shouldCategoryBeOpen = (
  listItems: InventoryItem[], 
  selectedItems: string[],
  hasSelection: boolean, 
  textFilter: string
): boolean => {
  // Only check existence of filter - Filtering done up the component tree
  // so we have items, it means they got through the filter, and the category
  // should be open by default
  if (textFilter && textFilter.length) {
    return true;
  } else if(hasSelection) {
    return isSelectedItemInGroup(listItems, selectedItems);
  }
  return false;
}

export default shouldCategoryBeOpen;