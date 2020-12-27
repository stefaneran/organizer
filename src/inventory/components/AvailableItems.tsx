import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, FormControlLabel, Switch, Collapse, Button } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NestedItemList from '@inventory/components/NestedItemList';
import ItemList from '@inventory/components/ItemList';
import { AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { RemoveBagIconSmall } from '@core/components/Icons/BagIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
  listContainer: {
    display: 'flex'
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  button: {
    display: 'block',
    margin: 'auto'
  }
}));

const availableItemsToArray = (availableItems, allItems) => 
  availableItems.map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))

const AvailableItems = ({ 
  isSelectedTab,
  allItems, 
  availableItems,
  actions,
  onAddToCart
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState([]);
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(true);

  const listItems = availableItemsToArray(availableItems, allItems);
  const hasSelectedItems = Boolean(selectedItems.length)

  const handleItemSelection = (newSelected) => {
    setSelectedItems(newSelected);
  }
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen)
  }
  const toggleNested = () => {
    setIsNested(!isNested);
  }
  const addSelectedToCart = () => {
    onAddToCart(selectedItems)
  }
  const removeSelected = () => {
    actions.inventory.removeFromAvailable(selectedItems);
  }
  const handleRemove = (itemId) => {
    actions.inventory.removeFromAvailable([itemId]);
  }

  return (
    <div className={classes.listContainer}>
      <div style={{ flexGrow: isSelectedTab ? 3 : 1 }}>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleOpen} className={classes.title}>
            <ListItemText primary={"Available"} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {isNested ? (
            <NestedItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
              onRemoveItem={handleRemove}
              removeIcon={RemoveBagIconSmall}
              onAddItem={onAddToCart}
              addIcon={AddCartIconSmall}
            />
          ) : (
            <ItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
              onRemoveItem={handleRemove}
              removeIcon={RemoveBagIconSmall}
              onAddItem={onAddToCart}
              addIcon={AddCartIconSmall}
            />
          )}
          </Collapse>
        </List>
      </div>
      {isSelectedTab && (
        <div style={{ flexGrow: 1 }}>
          <FormControlLabel 
            label="Grouped by Category"
            control={
              <Switch 
                checked={isNested} 
                onChange={toggleNested} 
                color="primary" 
              />
            }
          />
          {hasSelectedItems && (
            <>
              <Button 
                className={classes.button}
                variant="outlined" 
                color="primary" 
                onClick={addSelectedToCart}
              >
                Add Selected (Cart)
              </Button>
              <Button 
                className={classes.button}
                variant="outlined" 
                color="primary" 
                onClick={removeSelected}
              >
                Remove Selected (Delete)
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AvailableItems;