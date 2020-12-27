import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, ListItemIcon,
  FormControlLabel, Switch, Collapse, Button, Tooltip, Divider 
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import NestedItemList from '@inventory/components/NestedItemList';
import ItemList from '@inventory/components/ItemList';
import { AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { BagIconSmall, RemoveBagIconSmall } from '@core/components/Icons/BagIcon';
import { AddCartIconXS } from '@core/components/Icons/CartIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
  listContainer: {
    display: 'flex'
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  button: {
    margin: 'auto',
    marginTop: '1.5em'
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
      <div style={{ width: isSelectedTab && isOpen ? '65%' : '100%' }}>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleOpen} className={classes.title}>
            <ListItemIcon>
              <BagIconSmall />
            </ListItemIcon>
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
      {isSelectedTab && isOpen && (
        <div style={{ width: '35%' }}>
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
          <Divider />
          {hasSelectedItems && (
            <>
              <Tooltip title="Add Selected to Cart">
                <Button 
                  className={classes.button}
                  variant="outlined" 
                  color="primary" 
                  onClick={addSelectedToCart}
                  startIcon={<CheckBoxOutlinedIcon />}
                  endIcon={<AddCartIconXS />}
                >
                  Add To
                </Button>
              </Tooltip>
              <br />
              <Tooltip title="Remove Selected">
                <Button 
                  className={classes.button}
                  variant="outlined" 
                  color="primary" 
                  onClick={removeSelected}
                  startIcon={<CheckBoxOutlinedIcon />}
                >
                  Remove 
                </Button>
              </Tooltip>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AvailableItems;