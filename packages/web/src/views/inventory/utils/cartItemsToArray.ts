import { GroceryItem, GroceryItemEdit } from 'inventory/types';

const cartItemsToArray = (
  cart: string[], 
  groceries: Record<string, GroceryItemEdit>
): GroceryItem[] => 
  cart.map(id => ({ 
    id, 
    name: groceries[id] ? groceries[id].name : '', 
    category: groceries[id] ? groceries[id].category : ''
  }))

export default cartItemsToArray;