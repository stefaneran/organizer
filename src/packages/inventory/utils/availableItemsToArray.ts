import { InventoryItem } from '@inventory/types';

const availableItemsToArray = (
  availableItems: string[], 
  allItems: Record<string, InventoryItem>, 
  textFilter: string
): InventoryItem[] => {
  let listItems: InventoryItem[] = availableItems.map(id => ({ 
    id, 
    name: allItems[id] ? allItems[id].name : '', 
    category: allItems[id] ? allItems[id].category : ''  
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  return listItems;
}

export default availableItemsToArray;