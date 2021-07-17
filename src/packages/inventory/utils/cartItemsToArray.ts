import { InventoryItem, InventoryItemEdit } from 'inventory/types';

const cartItemsToArray = (
  cart: string[], 
  allItems: Record<string, InventoryItemEdit>
): InventoryItem[] => 
  cart.map(id => ({ 
    id, 
    name: allItems[id] ? allItems[id].name : '', 
    category: allItems[id] ? allItems[id].category : ''  
  }))

export default cartItemsToArray;