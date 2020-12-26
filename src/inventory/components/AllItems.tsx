import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, FormControlLabel, Switch, Collapse, Button } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NestedItemList from '@inventory/components/NestedItemList';
import ItemList from '@inventory/components/ItemList';

const useStyles = makeStyles((theme: Theme) => createStyles({
  listContainer: {
    display: 'flex'
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  button: {
    display: 'block'
  }
}));

const allItemsToArray = (allItems) => 
  Object.keys(allItems).map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))

const AllItems = ({ 
  isSelectedTab,
  allItems, 
  availableItems,
  cart,
  actions
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState([]);
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(true);

  const listItems = allItemsToArray(allItems);
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
    actions.cart.add(selectedItems)
  }
  const addMissingToCart = () => {
    const missing = listItems.filter(item => !availableItems.includes(item.id)).map(item => item.id);
    actions.cart.add(missing);
  }

  return (
    <div className={classes.listContainer}>
      <div style={{ flexGrow: isSelectedTab ? 3 : 1 }}>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleOpen} className={classes.title}>
            <ListItemText primary={"All items"} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {isNested ? (
            <NestedItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              availableItems={availableItems} 
              cart={cart}
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
            />
          ) : (
            <ItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              availableItems={availableItems} 
              cart={cart}
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
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
            <Button 
              className={classes.button}
              variant="outlined" 
              color="primary" 
              onClick={addSelectedToCart}
            >
              Add Selected To Cart
            </Button>
          )}
          <Button 
            className={classes.button}
            variant="outlined" 
            color="primary" 
            onClick={addMissingToCart}
          >
            Add All Missing To Cart
          </Button>
        </div>
      )}
    </div>
  )
}

export default AllItems;