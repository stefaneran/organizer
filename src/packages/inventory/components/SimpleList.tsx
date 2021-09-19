import * as React from 'react';
import { List } from '@material-ui/core';
import InventoryListItem from 'inventory/components/InventoryListItem';
import genericSort from '@core/utils/genericSort';
import { InventoryItem, InventoryItemEdit, RowIcon } from 'inventory/types';

interface Props {
  isSelectedTab: boolean;
  listItems: InventoryItem[];
  allItems?: Record<string, InventoryItemEdit>;
  availableItems?: string[];
  cart?: string[];
  selectedItems: string[];
  rowIcons?: RowIcon[];
  onItemSelection: (selected: string[]) => void;
  onEdit?: (id: string, item: Omit<InventoryItem, "id">) => void;
  toggleNutrition?: (id?: string, isEdit?: boolean) => void;
}

const SimpleList: React.FC<Props> = ({ 
  listItems, 
  isSelectedTab,
  allItems,
  availableItems, 
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
      {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(item => (
        <InventoryListItem 
          key={item.id}
          allItems={allItems}
          availableItems={availableItems} 
          cart={cart}
          item={item}
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
