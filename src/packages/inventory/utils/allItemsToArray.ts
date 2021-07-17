import { InventoryItem, InventoryItemEdit } from 'inventory/types';

interface Props {
  allItems: Record<string, InventoryItemEdit>, 
  textFilter: string
}

const allItemsToArray = ({
  allItems, 
  textFilter
}: Props): InventoryItem[] => {
  let listItems = Object.keys(allItems).map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  return listItems;
}

export default allItemsToArray;