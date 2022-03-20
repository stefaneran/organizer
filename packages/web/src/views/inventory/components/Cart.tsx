import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Button, Tooltip } from '@material-ui/core';
import SimpleList from 'inventory/components/SimpleList';
import AddGroceryInput from 'inventory/components/AddGroceryInput';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { RemoveCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS } from '@core/components/Icons/BagIcon';
import cartItemsToArray from 'inventory/utils/cartItemsToArray';
import { InventoryTabs, GroceryItemEdit, InventoryActions } from 'inventory/types';
import { ClickEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    padding: '1em',
    display: 'inline-block',
    overflow: 'hidden',
    transition: 'width 300ms'
  },
  contentContainer: {
    height: '75%',
    overflowY: 'auto',
    display: 'flex'
  },
  listContainer: {
    display: 'flex'
  },
  button: {
    margin: 'auto'
  }
}))

interface Props {
  cart: string[];
  cartSelected: string[];
  actions: InventoryActions;
  groceries: Record<string, GroceryItemEdit>;
  isSelectedTab: boolean;
  setSelectedTab: (selected: InventoryTabs) => () => void;
}

const Cart: React.FC<Props> = ({
  cart, 
  cartSelected,
  actions, 
  groceries, 
  isSelectedTab, 
  setSelectedTab 
}) => {

  const classes = useStyles();
  const listItems = cartItemsToArray(cart, groceries)
  const hasSelectedItems = Boolean(cartSelected.length);

  const handleItemSelection = (newSelected: string[]) => {
    actions.cart.updateSelected(newSelected);
  }
  const handleRemoveItem = (id: string) => {
    actions.cart.remove([id]);
  }
  const handleRemoveSelected = () => {
    actions.cart.remove(cartSelected);
  }
  const handleAddToCart = (id: string) => {
    actions.cart.add([id]);
  }
  const handleFinishShopping = (event: ClickEvent) => {
    event.stopPropagation();
    actions.cart.finishShopping();
  }

  return (
    <div 
      className={classes.container}
      style={{
        width: isSelectedTab ? '70%' : '30%',
        background: isSelectedTab ? '' : 'rgba(0, 0, 0, 0.05)',
        cursor: isSelectedTab ? '' : 'pointer'
      }}
      onClick={!isSelectedTab ? setSelectedTab(InventoryTabs.Cart) : undefined}
    >
      <Typography variant="h4">
        Cart
      </Typography>
      <div className={classes.contentContainer}>
        <div style={{ width: isSelectedTab && hasSelectedItems ? '65%' : '100%' }}>
          <SimpleList 
            isSelectedTab={isSelectedTab}
            listItems={listItems} 
            selectedItems={cartSelected} 
            onItemSelection={handleItemSelection}
            rowIcons={[
              { icon: <RemoveCartIconSmall />, handler: handleRemoveItem }
            ]}
          />
        </div>
        {isSelectedTab && hasSelectedItems && (
          <div style={{ width: '35%' }}>
            <Tooltip title="Remove Selected">
              <Button 
                className={classes.button}
                variant="outlined" 
                color="primary" 
                onClick={handleRemoveSelected}
                startIcon={<CheckBoxOutlinedIcon />}
              >
                Remove
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
      <AddGroceryInput 
        groceries={groceries} 
        targetCollection={cart} 
        onChange={handleAddToCart} 
      />
      <Tooltip title="Add to Inventory">
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleFinishShopping}
          endIcon={<AddBagIconXS />}
        >
          Finish Shopping
        </Button>
      </Tooltip>
    </div>
  )
}

export default Cart;