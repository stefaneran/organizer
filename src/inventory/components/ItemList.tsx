import * as React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core';
import { TrashIconSmall, TrashIconSmallWhite } from '@core/components/Icons/DeleteIcon';
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

const getIcon = (iconAction, background) => {
  // Dirty exception for Delete icon in items with red background
  if (iconAction.isDelete && background === 'rgb(255, 89, 100)') {
    return <TrashIconSmallWhite />
  } else if (iconAction.isDelete) {
    return <TrashIconSmall />
  }
  const { icon } = iconAction;
  return icon;
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

  // Used only in case of AllItems
  const itemBackground = (item) => shouldCheckAvailable ? getWarningColor(item, cart, availableItems) : '';

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
            background: itemBackground(item)
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
              {getIcon(iconAction, itemBackground(item))}
            </ListItemIcon>
          ))}
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList;
