import * as React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import getWarningColor from '@inventory/utils/getWarningColor';

interface Props {
  listItems;
  isSelectedTab;
  availableItems?;
  cart?;
  selectedItems?;
  onItemSelection?;
}

const ItemList = ({ 
  isSelectedTab, 
  listItems, 
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection 
}: Props) => {

  const shouldCheckAvailable = Boolean(availableItems);
  const hasSelection = Boolean(selectedItems);

  const handleSelection = (id) => (e) => {
    e.stopPropagation();
    const newSelected = 
      selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : 
        [...selectedItems, id]
    onItemSelection(newSelected);
  }

  return (
    <List component="div">
      {listItems && listItems.map(item => (
        <ListItem 
          key={item.id}
          button 
          onClick={hasSelection && handleSelection(item.id)}
          style={{ 
            background: shouldCheckAvailable ? getWarningColor(item, cart, availableItems) : ''
          }}
        >
          {hasSelection && isSelectedTab && (
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedItems.includes(item.id)}
                color="primary"
              />
            </ListItemIcon>
          )}
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList;
