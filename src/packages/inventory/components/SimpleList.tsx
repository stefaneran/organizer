import * as React from 'react';
import { List } from '@material-ui/core';
import CustomListItem from '@inventory/components/CustomListItem';
import genericSort from '@core/utils/genericSort';

interface Props {
  listItems;
  isSelectedTab;
  allItems?;
  availableItems?;
  cart?;
  selectedItems?;
  onItemSelection?;
  iconActions?;
  onEdit?;
}

const SimpleList = ({ 
  listItems, 
  isSelectedTab,
  allItems,
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  iconActions,
  onEdit
}: Props) => {

  const hasSelection = Boolean(selectedItems);

  const handleSelection = (id) => () => {
    const newSelected = selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : [...selectedItems, id]
    onItemSelection(newSelected);
  }

  return (
    <List component="div">
      {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(item => (
        <CustomListItem 
          key={item.id}
          allItems={allItems}
          availableItems={availableItems} 
          cart={cart}
          item={item}
          selectedItems={selectedItems}
          hasSelection={hasSelection}
          isSelectedTab={isSelectedTab}
          onSelect={handleSelection}
          iconActions={iconActions}
          onEdit={onEdit}
        />
      ))}
    </List>
  )
}

export default SimpleList;
