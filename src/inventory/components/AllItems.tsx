import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, ListItemIcon, Collapse,
  FormControlLabel, Switch, Button, Divider, Tooltip, TextField
} from '@material-ui/core';
import NestedItemList from '@inventory/components/NestedItemList';
import ItemList from '@inventory/components/ItemList';
import AddNewItemInput from '@inventory/components/AddNewItemInput';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AddCartIconXS, AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS, AddBagIconSmall } from '@core/components/Icons/BagIcon';
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
  },
  divider: {
    margin: '1em'
  },
  filter: {
    paddingLeft: '1em'
  },
  controlsSwitch: {
    width: '4%',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.05)'
    }
  },
  chevron: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  controlsContainer: {
    transition: 'width 300ms',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  }
}));

const allItemsToArray = (allItems, textFilter) => {
  let listItems = Object.keys(allItems).map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))
  if (textFilter.length) {
    listItems = listItems.filter(item => 
      item.name.toLowerCase().includes(textFilter.toLowerCase())
    )
  }
  return listItems;
}

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
  actions
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [textFilter, setTextFilter] = React.useState('');
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isControlsOpen, setIsControlsOpen] = React.useState(true);

  const listItems = allItemsToArray(allItems, textFilter);
  const hasSelectedItems = Boolean(selectedItems.length);
  const hasMissingItems = checkIfItemsMissing(allItems, availableItems, cart);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen)
  }
  const toggleControlsOpen = () => {
    setIsControlsOpen(!isControlsOpen);
  }
  const toggleNested = () => {
    setIsNested(!isNested);
  }
  const handleItemSelection = (newSelected) => {
    setSelectedItems(newSelected);
  }
  const handleTextFilterInput = (e) => {
    setTextFilter(e.target.value)
  }
  const handleAddNew = ({ name, category }) => {
    actions.inventory.addToAll({ name, category });
  }
  const handleAddSelectedToCart = () => {
    actions.cart.add(selectedItems)
  }
  const handleAddSelectedToAvailable = () => {
    actions.inventory.addToAvailable(selectedItems);
  }
  const handleAddMissingToCart = () => {
    const missing = listItems.filter(item => !availableItems.includes(item.id)).map(item => item.id);
    actions.cart.add(missing);
  }
  const handleRemoveSelected = () => {
    actions.inventory.removeFromAll(selectedItems);
  }
  const handleAddToAvailable = (id) => {
    actions.inventory.addToAvailable([id]);
  }
  const handleAddToCart = (id) => {
    actions.cart.add([id]);
  }
  const handleRemove = (itemId) => {
    actions.inventory.removeFromAll([itemId]);
  }

  return (
    <div className={classes.listContainer}>
      <div 
        style={{ 
          transition: 'width 300ms',
          width: isSelectedTab && isOpen && isControlsOpen ? '62%' : '100%' 
        }}
      >
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
              iconActions={[
                { icon: DeleteIconSmall, handler: handleRemove },
                { icon: AddBagIconSmall, handler: handleAddToAvailable },
                { icon: AddCartIconSmall, handler: handleAddToCart }
              ]}
              textFilter={textFilter}
            />
          ) : (
            <ItemList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              availableItems={availableItems} 
              cart={cart}
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
              iconActions={[
                { icon: DeleteIconSmall, handler: handleRemove },
                { icon: AddBagIconSmall, handler: handleAddToAvailable },
                { icon: AddCartIconSmall, handler: handleAddToCart }
              ]}
            />
          )}
          </Collapse>
        </List>
      </div>
      {isSelectedTab && isOpen && (
        <>
          <div className={classes.controlsSwitch} onClick={toggleControlsOpen}>
            {isControlsOpen ? (
              <ChevronRightIcon className={classes.chevron} color="primary" />
            ) : (
              <ChevronLeftIcon className={classes.chevron} color="primary" />
            )}
          </div>
          <div 
            className={classes.controlsContainer}
            style={{
              width: isControlsOpen ? '35%' : '0%' 
            }}
          >
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
            <Divider className={classes.divider} />
            <div className={classes.filter}>
              <TextField 
                value={textFilter}
                onChange={handleTextFilterInput}
                label="Filter" 
                size="small" 
                variant="outlined" 
                fullWidth
              />
            </div>
            <Divider className={classes.divider} />
            <AddNewItemInput allItems={allItems} onSubmit={handleAddNew} />
            <Divider className={classes.divider} />
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
                    color="secondary" 
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
        </>
      )}
    </div>
  )
}

export default AllItems;