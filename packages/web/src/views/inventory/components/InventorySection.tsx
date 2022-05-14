import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { addCart, addInventory, updateItem } from 'inventory/store/thunks';
// Icons
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AddCartIconXS, AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS } from '@core/components/Icons/BagIcon';
import { ListIconSmall, NestedIconSmall } from '@core/components/Icons/ListIcon';
// Components
import { 
  List, ListItem, ListItemText, Collapse,
  Button, Divider, Tooltip, TextField
} from '@material-ui/core';
import SwitchInput from '@core/components/inputs/SwitchInput';
import NestedList from 'inventory/components/NestedList';
import SimpleList from 'inventory/components/SimpleList';
import AddNewItemInput from 'inventory/components/AddNewGroceryInput';
import AddGroceryInput from 'inventory/components/AddGroceryInput';
// Types
import { GroceryItem, RowIcon, InventoryTabs } from 'inventory/types';
import { StateSetter, InputEvent, RootState, AppDispatch } from '@core/types';

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

type InventoryType = "all" | "available"

interface Props {
  inventoryType: InventoryType;
  isSelectedTab: boolean;
  selectedItems: string[];
  customRowIcons: RowIcon[];
  specificActions: Record<string, any>;
  setSelectedItems: StateSetter<string[]>;
  getList: (...args: any[]) => GroceryItem[];
}

const InventorySection: React.FC<Props> = ({
  inventoryType,
  isSelectedTab,
  selectedItems,
  customRowIcons,
  specificActions,
  setSelectedItems,
  getList
}) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groceries, inventory } = useSelector((state: RootState) => state.inventoryStore); 

  const [textFilter, setTextFilter] = React.useState('');
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isControlsOpen, setIsControlsOpen] = React.useState(true);

  const isAllType = inventoryType === 'all';
  const hasSelectedItems = Boolean(selectedItems.length);

  const memoDep = isAllType ? groceries : inventory;
  const listItems = React.useMemo(
    () => getList({ groceries, inventory, textFilter }), 
  [textFilter, memoDep]);

  const toggleControlsOpen = () => {
    setIsControlsOpen(!isControlsOpen);
  }
  const toggleNested = () => {
    setIsNested(!isNested);
  }
  const handleItemSelection = (newSelected: string[]) => {
    setSelectedItems(newSelected);
  }
  const handleTextFilterInput = (event: InputEvent) => {
    setTextFilter(event.target.value)
  }
  const handleAddSelectedToCart = () => {
    dispatch(addCart(selectedItems));
  }
  const handleAddToCart = (id: string) => {
    dispatch(addCart([id]));
  }
  const handleAddToAvailable = (id: string) => {
    dispatch(addInventory([id]));
  }
  const handleGroceriesUpdate = (id: string, updatedItem: GroceryItem) => {
    dispatch(updateItem(id, updatedItem));
  }

  const rowIcons = [
    ...customRowIcons,
    { icon: <AddCartIconSmall />, handler: handleAddToCart },
  ]
  
  return (
    <div className={classes.listContainer}>
      <div 
        style={{ 
          transition: 'width 300ms',
          width: isSelectedTab && isControlsOpen ? '62%' : '100%' 
        }}
      >
        <List component="div" disablePadding>
          <ListItem className={classes.title}>
            <ListItemText primary={isAllType ? "Groceries" : "Inventory"} />
          </ListItem>
          <Collapse in={true} timeout="auto" unmountOnExit>
            {isNested ? (
              <NestedList 
                isSelectedTab={isSelectedTab}
                groceryItems={listItems}
                selectedItems={selectedItems} 
                onItemSelection={handleItemSelection} 
                rowIcons={rowIcons}
                textFilter={textFilter}
                onEdit={isAllType ? handleGroceriesUpdate : undefined}
                toggleNutrition={specificActions.toggleNutrition}
              />
            ) : (
              <SimpleList 
                parentTab={InventoryTabs.Inventory}
                isSelectedTab={isSelectedTab}
                listItems={listItems}
                selectedItems={selectedItems} 
                onItemSelection={handleItemSelection} 
                rowIcons={rowIcons}
                onEdit={isAllType ? handleGroceriesUpdate : undefined}
                toggleNutrition={specificActions.toggleNutrition}
              />
            )}
          </Collapse>
        </List>
      </div>
      {isSelectedTab && (
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
              <SwitchInput 
                isChecked={isNested}
                onChange={toggleNested}
                className={classes.switchContainer}
                uncheckedIcon={<ListIconSmall />}
                checkedIcon={<NestedIconSmall />}
              />
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

            {inventoryType === "available" ? (
              <AddGroceryInput 
                groceries={groceries} 
                targetCollection={inventory} 
                onChange={handleAddToAvailable} 
              />
            ) : (
              <AddNewItemInput 
                groceries={groceries} 
                onSubmit={specificActions.addNew} 
              />
            )}
            
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
                {isAllType ? (
                  <>
                  <Tooltip title="Add Selected to Available">
                    <Button 
                      className={classes.button}
                      variant="outlined" 
                      color="primary" 
                      onClick={specificActions.addSelectedToAvailable}
                      startIcon={<CheckBoxOutlinedIcon />}
                      endIcon={<AddBagIconXS />}
                    >
                      Add To
                    </Button>
                  </Tooltip>
                  <br />
                  </>
                ) : null}
                <Tooltip title="Delete Selected">
                  <Button 
                    className={classes.button}
                    variant="outlined" 
                    color="secondary" 
                    onClick={specificActions.removeSelected}
                    startIcon={<CheckBoxOutlinedIcon />}
                  >
                    Delete
                  </Button>
                </Tooltip>
                <br />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default InventorySection;