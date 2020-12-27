import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, ListItemIcon, Collapse,
  FormControlLabel, Switch, Button, Divider, Tooltip 
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import NestedItemList from '@inventory/components/NestedItemList';
import ItemList from '@inventory/components/ItemList';
import AddNewItemInput from '@inventory/components/AddNewItemInput';
import { AddCartIconXS } from '@core/components/Icons/CartIcon';
import { AddBagIconXS } from '@core/components/Icons/BagIcon';
import { DeleteIconSmall } from '@core/components/Icons/DeleteIcon';
import { DatabaseIconSmall } from '@core/components/Icons/DatabaseIcon';

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

const allItemsToArray = (allItems) => 
  Object.keys(allItems).map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))

// Check if any items are missing from both available, and cart
const checkIfItemsMissing = (allItems, availableItems, cart) => {
  for (let i = 0; i < Object.keys(allItems).length; i += 1) {
    const id = Object.keys(allItems)[i];
    const isItemAvailable = availableItems.includes(id);
    const isItemInCart = cart.includes(id);
    if (!isItemAvailable && !isItemInCart) {
      return true;
    }
  }
  return false;
} 

const AllItems = ({ 
  isSelectedTab,
  allItems, 
  availableItems,
  cart,
  actions,
  onAddToCart
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState([]);
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(true);

  const listItems = allItemsToArray(allItems);
  const hasSelectedItems = Boolean(selectedItems.length);
  const hasMissingItems = checkIfItemsMissing(allItems, availableItems, cart);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen)
  }
  const toggleNested = () => {
    setIsNested(!isNested);
  }
  const handleItemSelection = (newSelected) => {
    setSelectedItems(newSelected);
  }
  const handleAddSelectedToCart = () => {
    onAddToCart(selectedItems)
  }
  const handleAddNew = ({ name, category }) => {
    actions.inventory.addToAll({ name, category });
  }
  const handleAddSelectedToAvailable = () => {
    actions.inventory.addToAvailable(selectedItems);
  }
  const handleAddMissingToCart = () => {
    const missing = listItems.filter(item => !availableItems.includes(item.id)).map(item => item.id);
    onAddToCart(missing);
  }
  const handleRemoveSelected = () => {
    actions.inventory.removeFromAll(selectedItems);
  }
  const handleRemove = (itemId) => {
    actions.inventory.removeFromAll([itemId]);
  }

  return (
    <div className={classes.listContainer}>
      <div style={{ width: isSelectedTab && isOpen ? '65%' : '100%' }}>
        <List component="div" disablePadding>
          <ListItem button onClick={toggleOpen} className={classes.title}>
            <ListItemIcon>
              <DatabaseIconSmall />
            </ListItemIcon>
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
              onRemoveItem={handleRemove}
              removeIcon={DeleteIconSmall}
            />
          ) : (
            <ItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              availableItems={availableItems} 
              cart={cart}
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
              onRemoveItem={handleRemove}
              removeIcon={DeleteIconSmall}
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
          <AddNewItemInput allItems={allItems} onSubmit={handleAddNew} />
          <Divider />
          {hasSelectedItems && (
            <>
              <Tooltip title="Add Selected to Cart">
                <Button 
                  className={classes.button}
                  variant="outlined" 
                  color="primary" 
                  onClick={handleAddSelectedToCart}
                  startIcon={<CheckBoxOutlinedIcon />}
                  endIcon={<AddCartIconXS />}
                >
                  Add To 
                </Button>
              </Tooltip>
              <br />
              <Tooltip title="Add Selected to Available">
                <Button 
                  className={classes.button}
                  variant="outlined" 
                  color="primary" 
                  onClick={handleAddSelectedToAvailable}
                  startIcon={<CheckBoxOutlinedIcon />}
                  endIcon={<AddBagIconXS />}
                >
                  Add To
                </Button>
              </Tooltip>
              <br />
              <Tooltip title="Delete Selected">
                <Button 
                  className={classes.button}
                  variant="outlined" 
                  color="primary" 
                  onClick={handleRemoveSelected}
                  startIcon={<CheckBoxOutlinedIcon />}
                >
                  Delete
                </Button>
              </Tooltip>
              <br />
            </>
          )}
          {hasMissingItems && (
            <Button 
              className={classes.button}
              variant="outlined" 
              color="primary" 
              onClick={handleAddMissingToCart}
              endIcon={<AddCartIconXS />}
            >
              Add Missing To
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default AllItems;