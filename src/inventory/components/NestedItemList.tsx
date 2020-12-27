import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, Checkbox } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import categorizeItems from '@inventory/utils/categorizeItems';
import getWarningColor from '@inventory/utils/getWarningColor';

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    paddingLeft: '1.5em'
  },
}));

const isSelectedItemInGroup = (items, selectedItems) => {
  for (let i = 0; i < items.length; i += 1) {
    if (selectedItems.includes(items[i].id)) {
      return true;
    }
  }
  return false;
}

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

const Collapsible = ({ 
  isSelectedTab, 
  category, 
  items, 
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  onRemoveItem,
  removeIcon,
  onAddItem,
  addIcon
}) => {

  const classes = useStyles();
  // Should check if item is in available list
  const shouldCheckAvailable = Boolean(availableItems);
  const hasSelection = Boolean(selectedItems);
  const canRemove = Boolean(onRemoveItem);
  const canAdd = Boolean(onAddItem);

  const [isOpen, setIsOpen] = React.useState(hasSelection ? isSelectedItemInGroup(items, selectedItems) : false);

  const handleSelection = (id) => () => {
    const newSelected = 
      selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : 
        [...selectedItems, id]
    onItemSelection(newSelected);
  }

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
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
    <>
      <ListItem button onClick={toggleOpen}>
        {/*
        <ListItemIcon>
            TODO: Add dynamic icons 
        </ListItemIcon>
        */}
        <ListItemText primary={category} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" className={classes.item}>
          {items && items.map(item => (
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
            )
          )}
        </List>
      </Collapse>
    </>
  )
}

const NestedItemList = ({ 
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
  const categories = categorizeItems(listItems);
  return (
    <List component="div" disablePadding>
      {categories && Object.keys(categories).map(category => (
        <Collapsible 
          key={category}
          isSelectedTab={isSelectedTab}
          category={category} 
          items={categories[category]} 
          availableItems={availableItems} 
          cart={cart}
          selectedItems={selectedItems}
          onItemSelection={onItemSelection}
          onRemoveItem={onRemoveItem}
          removeIcon={removeIcon}
          onAddItem={onAddItem}
          addIcon={addIcon}
        />
      ))}
    </List>
  )
}

export default NestedItemList;