import * as React from 'react';
import { List } from '@material-ui/core';
import InventoryListItem from 'inventory/components/InventoryListItem';
import genericSort from '@core/utils/genericSort';
import { GroceryItem, GroceryItemEdit, RowIcon } from 'inventory/types';

interface Props {
  isSelectedTab: boolean;
  listItems: GroceryItem[];
  groceries?: Record<string, GroceryItemEdit>;
  inventory?: string[];
  cart?: string[];
  selectedItems: string[];
  rowIcons?: RowIcon[];
  onItemSelection: (selected: string[]) => void;
  onEdit?: (id: string, item: Omit<GroceryItem, "id">) => void;
  toggleNutrition?: (id?: string, isEdit?: boolean) => void;
}

const SimpleList: React.FC<Props> = ({ 
  listItems, 
  isSelectedTab,
  groceries,
  inventory, 
  cart,
  selectedItems, 
  rowIcons,
  onItemSelection,
  onEdit,
  toggleNutrition
}) => {

  const handleSelection = (id: string) => () => {
    const newSelected = selectedItems.includes(id) ? selectedItems.filter(itemId => itemId !== id) : [...selectedItems, id]
    onItemSelection(newSelected);
  }

  return (
    <List component="div">
      {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(groceryItem => (
        <InventoryListItem 
          key={groceryItem.id}
          groceries={groceries}
          inventory={inventory} 
          cart={cart}
          groceryItem={groceryItem}
          selectedItems={selectedItems}
          isSelectedTab={isSelectedTab}
          onSelect={handleSelection}
          rowIcons={rowIcons}
          onEdit={onEdit}
          toggleNutrition={toggleNutrition}
        />
      ))}
    </List>
  )
}

export default SimpleList;
