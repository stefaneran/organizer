import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { addCart, updateCartSelected, removeCart, finishShopping } from 'inventory/store/thunks';
// Icons
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { AddBagIconXS } from '@core/components/Icons/BagIcon';
import { RemoveCartIconSmall } from '@core/components/Icons/CartIcon';
// Components
import { Typography, Button, Tooltip } from '@material-ui/core';
import SimpleList from 'inventory/components/SimpleList';
import AddGroceryInput from 'inventory/components/AddGroceryInput';
// Utils
import cartItemsToArray from 'inventory/utils/cartItemsToArray';
// Types
import { InventoryTabs } from 'inventory/types';
import { ClickEvent, RootState, AppDispatch } from '@core/types';

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
  isSelectedTab: boolean;
  setSelectedTab: (selected: InventoryTabs) => () => void;
}

const Cart: React.FC<Props> = ({
  isSelectedTab, 
  setSelectedTab 
}) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groceries, cart, cartSelected } = useSelector((state: RootState) => state.inventoryStore); 

  const listItems = cartItemsToArray(cart, groceries)
  const hasSelectedItems = Boolean(cartSelected.length);

  const handleItemSelection = (newSelected: string[]) => {
    dispatch(updateCartSelected(newSelected));
  }
  const handleRemoveItem = (id: string) => {
    dispatch(removeCart([id]));
  }
  const handleRemoveSelected = () => {
    dispatch(removeCart(cartSelected));
  }
  const handleAddToCart = (id: string) => {
    dispatch(addCart([id]));
  }
  const handleFinishShopping = (event: ClickEvent) => {
    event.stopPropagation();
    dispatch(finishShopping());
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
            parentTab={InventoryTabs.Cart}
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