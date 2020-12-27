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
  onRemoveItem?;
  removeIcon?;
  onAddItem?;
  addIcon?;
}

const ItemList = ({ 
  isSelectedTab, 
  listItems, 
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  onRemoveItem,
  removeIcon,
  onAddItem,
  addIcon
}: Props) => {

  const shouldCheckAvailable = Boolean(availableItems);
  const hasSelection = Boolean(selectedItems);
  const canRemove = Boolean(onRemoveItem);
  const canAdd = Boolean(onAddItem);

  const handleSelection = (id) => () => {
    const newSelected = 
      selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : 
        [...selectedItems, id]
    onItemSelection(newSelected);
  }

  const handleRemove = (id) => (e) => {
    e.stopPropagation();
    onRemoveItem(id);
  }

  const handleAdd = (id) => (e) => {
    e.stopPropagation();
    onAddItem(id);
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
          {canRemove && (
            <ListItemIcon onClick={handleRemove(item.id)}>
              {removeIcon()}
            </ListItemIcon>
          )}
          {canAdd && (
            <ListItemIcon onClick={handleAdd(item.id)}>
              {addIcon()}
            </ListItemIcon>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList;
