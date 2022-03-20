import { GroceryItem } from 'inventory/types';

const isSelectedItemInGroup = (
  listItems: GroceryItem[], 
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
  listItems: GroceryItem[], 
  selectedItems: string[],
  hasSelection: boolean, 
  textFilter: string
): boolean => {
  // Only check existence of filter - Filtering done up the component tree
  // so if we have items, it means they got through the filter, and the category
  // should be open by default
  if (textFilter && textFilter.length) {
    return true;
  } else if(hasSelection) {
    return isSelectedItemInGroup(listItems, selectedItems);
  }
  return false;
}

export default shouldCategoryBeOpen;