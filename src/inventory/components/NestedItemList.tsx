import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, Checkbox } from '@material-ui/core';
import { TrashIconSmall, TrashIconSmallWhite } from '@core/components/Icons/DeleteIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import categorizeItems from '@inventory/utils/categorizeItems';
import getWarningColor from '@inventory/utils/getWarningColor';
import genericSort from '@core/utils/genericSort';

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

const shouldBeOpen = (textFilter, hasSelection, items, selectedItems) => {
  if (textFilter && textFilter.length) {
    return true;
  } else if(hasSelection) {
    return isSelectedItemInGroup(items, selectedItems);
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
  iconActions?;
  textFilter?;
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

const Collapsible = ({ 
  isSelectedTab, 
  category, 
  items, 
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  iconActions,
  textFilter
}) => {

  const classes = useStyles();
  // Should check if item is in available list
  const shouldCheckAvailable = Boolean(availableItems);
  const hasSelection = Boolean(selectedItems);

  const [isOpen, setIsOpen] = React.useState(shouldBeOpen(textFilter, hasSelection, items, selectedItems));

  React.useEffect(() => {
    setIsOpen(shouldBeOpen(textFilter, hasSelection, items, selectedItems));
  }, [textFilter])

  // Used only in case of AllItems
  const itemBackground = (item) => shouldCheckAvailable ? getWarningColor(item, cart, availableItems) : '';

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

  const handleIconAction = (id, handler) => (e) => {
    e.stopPropagation();
    handler(id);
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
          {items && items.sort((a, b) => genericSort(a.name, b.name)).map(item => (
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
              {iconActions && iconActions.map((iconAction, index) => (
                <ListItemIcon key={`${item.id}-${index}`} onClick={handleIconAction(item.id, iconAction.handler)}>
                  {getIcon(iconAction, itemBackground(item))}
                </ListItemIcon>
              ))}
            </ListItem>
            )
          )}
        </List>
      </Collapse>
    </>
  )
}

const NestedItemList = ({ 
  listItems, 
  isSelectedTab,
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  iconActions,
  textFilter
}: Props) => {
  const categories = categorizeItems(listItems);
  return (
    <List component="div" disablePadding>
      {categories && Object.keys(categories).sort((a, b) => genericSort(a, b)).map(category => (
        <Collapsible 
          key={category}
          isSelectedTab={isSelectedTab}
          category={category} 
          items={categories[category]} 
          availableItems={availableItems} 
          cart={cart}
          selectedItems={selectedItems}
          onItemSelection={onItemSelection}
          iconActions={iconActions}
          textFilter={textFilter}
        />
      ))}
    </List>
  )
}

export default NestedItemList;