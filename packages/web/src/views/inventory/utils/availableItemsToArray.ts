import { GroceryItem, GroceryItemEdit } from 'inventory/types';

interface Props {
  inventory: string[];
  groceries: Record<string, GroceryItemEdit>;
  textFilter: string;
}

const availableItemsToArray = ({
  inventory, 
  groceries, 
  textFilter
}: Props): GroceryItem[] => {
  let listItems: GroceryItem[] = inventory.map(id => ({ 
    id, 
    name: groceries[id] ? groceries[id].name : '', 
    category: groceries[id] ? groceries[id].category : ''  
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  return listItems;
}

export default availableItemsToArray;