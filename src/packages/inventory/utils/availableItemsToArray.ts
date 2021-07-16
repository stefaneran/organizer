import { InventoryItem } from 'inventory/types';

interface Props {
  availableItems: string[];
  allItems: Record<string, InventoryItem>;
  textFilter: string;
}

const availableItemsToArray = ({
  availableItems, 
  allItems, 
  textFilter
}: Props): InventoryItem[] => {
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