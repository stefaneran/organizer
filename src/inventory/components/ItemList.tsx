import * as React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import getWarningColor from '@inventory/utils/getWarningColor';
import genericSort from '@core/utils/genericSort';

interface Props {
  listItems;
  isSelectedTab;
  availableItems?;
  cart?;
  selectedItems?;
  onItemSelection?;
  iconActions?;
}

const ItemList = ({ 
  listItems, 
  isSelectedTab,
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  iconActions
}: Props) => {

  const shouldCheckAvailable = Boolean(availableItems);
  const hasSelection = Boolean(selectedItems);

  const handleSelection = (id) => () => {
    const newSelected = 
      selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : 
        [...selectedItems, id]
    onItemSelection(newSelected);
  }

  const handleIconAction = (id, handler) => (e) => {
    e.stopPropagation();
    handler(id);
  }

  return (
    <List component="div">
      {listItems && listItems.sort((a, b) => genericSort(a.name, b.name)).map(item => (
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
          <ListItemText primary={item.name} secondary={item.category} />
          {iconActions && iconActions.map((iconAction, index) => (
            <ListItemIcon key={`${item.id}-${index}`} onClick={handleIconAction(item.id, iconAction.handler)}>
              {iconAction.icon()}
            </ListItemIcon>
          ))}
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList;
