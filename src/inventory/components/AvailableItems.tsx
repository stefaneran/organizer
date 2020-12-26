import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, FormControlLabel, Switch, Collapse, Button } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NestedItemList from '@inventory/components/NestedItemList';
import ItemList from '@inventory/components/ItemList';
import AddItemInput from '@inventory/components/AddItemInput';

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
  actions
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
    actions.cart.add(selectedItems)
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
            />
          ) : (
            <ItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
            />
          )}
          </Collapse>
        </List>
        <AddItemInput allItems={allItems} onSubmit={() => {}} />
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
        </div>
      )}
    </div>
  )
}

export default AvailableItems;