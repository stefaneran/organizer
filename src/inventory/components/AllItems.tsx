import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, ListItemIcon, Collapse,
  Switch, Button, Divider, Tooltip, TextField
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AddCartIconXS, AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS, AddBagIconSmall } from '@core/components/Icons/BagIcon';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import { DatabaseIconSmall } from '@core/components/Icons/DatabaseIcon';
import { ListIconSmall, NestedIconSmall } from '@core/components/Icons/ListIcon';
import NestedList from '@inventory/components/NestedList';
import SimpleList from '@inventory/components/SimpleList';
import AddNewItemInput from '@inventory/components/AddNewItemInput';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';

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
  switchContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& > svg': {
      position: 'relative',
      top: '8px'
    }
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
  const [isConfirmationOpen, setConfirmationOpen] = React.useState({ isOpen: false, itemId: undefined });

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
  const toggleConfirmationDialog = (e?) => {
    const { isOpen } = isConfirmationOpen;
    // From lists we receive the itemId as an argument, but everywhere else we receive event object
    const itemId = typeof e === 'string' ? e : undefined;
    // If clicked on "Delete" row action, but there are selected, clear selection so they don't all get deleted
    if (itemId && selectedItems) {
      setSelectedItems([])
    }
    setConfirmationOpen({ isOpen: !isOpen, itemId });
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
    actions.recipes.removeIngredient(selectedItems);
    setSelectedItems([]);
    toggleConfirmationDialog();
  }
  const handleRemove = (itemId) => async () => {
    actions.inventory.removeFromAll([itemId]);
    actions.recipes.removeIngredient([itemId]);
    setSelectedItems(selectedItems.filter(id => id !== itemId));
    toggleConfirmationDialog();
  }
  const handleAddToAvailable = (id) => {
    actions.inventory.addToAvailable([id]);
  }
  const handleAddToCart = (id) => {
    actions.cart.add([id]);
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
            <NestedList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              allItems={allItems}
              availableItems={availableItems} 
              cart={cart}
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
              iconActions={[
                { isDelete: true, handler: toggleConfirmationDialog }, // One-Time exception
                { icon: <AddBagIconSmall />, handler: handleAddToAvailable },
                { icon: <AddCartIconSmall />, handler: handleAddToCart }
              ]}
              textFilter={textFilter}
              onEdit={actions.inventory.edit}
            />
          ) : (
            <SimpleList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              allItems={allItems}
              availableItems={availableItems} 
              cart={cart}
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection} 
              iconActions={[
                { isDelete: true, handler: toggleConfirmationDialog }, // One-Time exception
                { icon: <AddBagIconSmall />, handler: handleAddToAvailable },
                { icon: <AddCartIconSmall />, handler: handleAddToCart }
              ]}
              onEdit={actions.inventory.edit}
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
            <Tooltip title="View by Category or All" placement="top">
              <div className={classes.switchContainer}>
                <ListIconSmall />
                <Switch 
                  checked={isNested} 
                  onChange={toggleNested} 
                  color="primary" 
                />
                <NestedIconSmall />
              </div>
            </Tooltip>
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
                    onClick={toggleConfirmationDialog}
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
      {isConfirmationOpen.isOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={'Confirm To Delete Item(s)'}
          confirmationText={`Are you sure you want to delete ${hasSelectedItems ? 'these items' : 'this item'}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={hasSelectedItems ? handleRemoveSelected : handleRemove(isConfirmationOpen.itemId)}
        />
      )}
    </div>
  )
}

export default AllItems;