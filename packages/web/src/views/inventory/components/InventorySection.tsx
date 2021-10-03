import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, Collapse,
  Button, Divider, Tooltip, TextField
} from '@material-ui/core';
// Icons
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { AddCartIconXS, AddCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS } from '@core/components/Icons/BagIcon';
import { ListIconSmall, NestedIconSmall } from '@core/components/Icons/ListIcon';
// Components
import SwitchInput from '@core/components/inputs/SwitchInput';
import NestedList from 'inventory/components/NestedList';
import SimpleList from 'inventory/components/SimpleList';
import AddNewItemInput from 'inventory/components/AddNewItemInput';
import AddItemInput from 'inventory/components/AddItemInput';
// Types
import { InventoryItem, InventoryItemEdit, RowIcon, InventoryActions } from 'inventory/types';
import { StateSetter, InputEvent } from '@core/types';

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
  setSelectedItems: StateSetter<string[]>;
  allItems: Record<string, InventoryItemEdit>;
  availableItems: string[];
  cart?: string[];
  customRowIcons: RowIcon[];
  actions: InventoryActions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  specificActions: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getList: (...args: any[]) => InventoryItem[];
}

const InventorySection: React.FC<Props> = ({
  inventoryType,
  isSelectedTab,
  selectedItems,
  setSelectedItems,
  allItems, 
  availableItems,
  cart,
  customRowIcons,
  actions,
  specificActions,
  getList
}) => {
  const classes = useStyles();

  const [textFilter, setTextFilter] = React.useState('');
  // Should group items by category
  const [isNested, setIsNested] = React.useState(true);
  const [isControlsOpen, setIsControlsOpen] = React.useState(true);

  const isAllType = inventoryType === 'all';
  const hasSelectedItems = Boolean(selectedItems.length);

  const memoDep = isAllType ? allItems : availableItems;
  const listItems = React.useMemo(
    () => getList({ allItems, availableItems, textFilter }), 
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
    actions.cart.add(selectedItems)
  }
  const handleAddToCart = (id: string) => {
    actions.cart.add([id]);
  }
  const handleAddToAvailable = (id: string) => {
    actions.inventory.addToAvailable([id])
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
            <ListItemText primary={isAllType ? "All Items" : "Available Items"} />
          </ListItem>
          <Collapse in={true} timeout="auto" unmountOnExit>
            {isNested ? (
              <NestedList 
                isSelectedTab={isSelectedTab}
                listItems={listItems} 
                allItems={allItems}
                availableItems={availableItems} 
                cart={cart}
                selectedItems={selectedItems} 
                onItemSelection={handleItemSelection} 
                rowIcons={rowIcons}
                textFilter={textFilter}
                onEdit={isAllType ? actions.inventory.edit : undefined}
                toggleNutrition={specificActions.toggleNutrition}
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
                rowIcons={rowIcons}
                onEdit={isAllType ? actions.inventory.edit : undefined}
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
              <AddItemInput 
                allItems={allItems} 
                targetCollection={availableItems} 
                onChange={handleAddToAvailable} 
              />
            ) : (
              <AddNewItemInput 
                allItems={allItems} 
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