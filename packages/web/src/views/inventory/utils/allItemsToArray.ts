import { GroceryItem, GroceryItemEdit } from 'inventory/types';

interface Props {
  groceries: Record<string, GroceryItemEdit>, 
  textFilter: string
}

const allItemsToArray = ({
  groceries, 
  textFilter
}: Props): GroceryItem[] => {
  let listItems = Object.entries(groceries).map(([id, item]) => ({ 
    id, 
    ...item
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  return listItems;
}

export default allItemsToArray;