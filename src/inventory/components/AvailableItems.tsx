import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, ListItemIcon,
  Switch, Collapse, Button, Tooltip, Divider, TextField
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { BagIconSmall, RemoveBagIconSmall } from '@core/components/Icons/BagIcon';
import { AddCartIconXS } from '@core/components/Icons/CartIcon';
import { ListIconSmall, NestedIconSmall } from '@core/components/Icons/ListIcon';
import NestedList from '@inventory/components/NestedList';
import SimpleList from '@inventory/components/SimpleList';
import AddItemInput from '@inventory/components/AddItemInput';
import availableItemsToArray from '@inventory/utils/availableItemsToArray';

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

const AvailableItems = ({ 
  isSelectedTab,
  allItems, 
  availableItems,
  actions
}) => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [textFilter, setTextFilter] = React.useState('');
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isControlsOpen, setIsControlsOpen] = React.useState(true);

  const listItems = availableItemsToArray(availableItems, allItems, textFilter);
  const hasSelectedItems = Boolean(selectedItems.length)

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
  const handleAddSelectedToCart = () => {
    actions.cart.add(selectedItems)
  }
  const handleRemoveSelected = () => {
    actions.inventory.removeFromAvailable(selectedItems);
    setSelectedItems([]);
  }
  const handleRemove = (itemId) => {
    actions.inventory.removeFromAvailable([itemId]);
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  }
  const handleAddToCart = (id) => {
    actions.cart.add([id]);
  }
  const handleAddToAvailable = (id) => {
    actions.inventory.addToAvailable([id])
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
              <BagIconSmall />
            </ListItemIcon>
            <ListItemText primary={"Available"} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {isNested ? (
            <NestedList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection}
              iconActions={[
                { icon: <RemoveBagIconSmall />, handler: handleRemove },
                { icon: <AddCartIconSmall />, handler: handleAddToCart }
              ]}
              textFilter={textFilter}
            />
          ) : (
            <SimpleList 
              isSelectedTab={isSelectedTab}
              listItems={listItems} 
              selectedItems={selectedItems} 
              onItemSelection={handleItemSelection}
              iconActions={[
                { icon: <RemoveBagIconSmall />, handler: handleRemove },
                { icon: <AddCartIconSmall />, handler: handleAddToCart }
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
            <AddItemInput 
              allItems={allItems} 
              targetCollection={availableItems} 
              onChange={handleAddToAvailable} 
            />
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
                <Tooltip title="Remove Selected">
                  <Button 
                    className={classes.button}
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleRemoveSelected}
                    startIcon={<CheckBoxOutlinedIcon />}
                  >
                    Remove 
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AvailableItems;