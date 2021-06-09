import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import InventoryListItem from '@inventory/components/InventoryListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import categorizeItems from '@core/utils/categorizeItems';
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
  // We only check for the existence of a text filter because the filtering is done outside the component, so we only receive results
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
  allItems?;
  availableItems?;
  cart?;
  selectedItems?;
  onItemSelection?;
  iconActions?;
  textFilter?;
  onEdit?;
}

const Collapsible = ({ 
  isSelectedTab,
  category, 
  items, 
  allItems,
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  iconActions,
  textFilter,
  onEdit
}) => {

  const classes = useStyles();

  const hasSelection = Boolean(selectedItems);

  const [isOpen, setIsOpen] = React.useState(shouldBeOpen(textFilter, hasSelection, items, selectedItems));

  React.useEffect(() => {
    setIsOpen(shouldBeOpen(textFilter, hasSelection, items, selectedItems));
  }, [textFilter])

  const handleSelection = (id) => () => {
    const newSelected = 
      selectedItems.includes(id) ? 
        selectedItems.filter(itemId => itemId !== id) : 
        [...selectedItems, id]
    onItemSelection(newSelected);
  }

  const toggleOpen = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
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
            <InventoryListItem 
              key={item.id}
              allItems={allItems}
              availableItems={availableItems}
              cart={cart}
              item={item}
              selectedItems={selectedItems}
              isSelectedTab={isSelectedTab}
              onSelect={handleSelection}
              iconActions={iconActions}
              onEdit={onEdit}
            />
            )
          )}
        </List>
      </Collapse>
    </>
  )
}

const NestedList = ({ 
  listItems, 
  isSelectedTab,
  allItems,
  availableItems, 
  cart,
  selectedItems, 
  onItemSelection,
  iconActions,
  textFilter,
  onEdit
}: Props) => {
  const categories = React.useMemo(() => categorizeItems(listItems, "category"), [listItems]);
  return (
    <List component="div" disablePadding>
      {categories && Object.keys(categories).sort((a, b) => genericSort(a, b)).map(category => (
        <Collapsible 
          key={category}
          isSelectedTab={isSelectedTab}
          category={category} 
          items={categories[category]} 
          allItems={allItems}
          availableItems={availableItems} 
          cart={cart}
          selectedItems={selectedItems}
          onItemSelection={onItemSelection}
          iconActions={iconActions}
          textFilter={textFilter}
          onEdit={onEdit}
        />
      ))}
    </List>
  )
}

export default NestedList;