import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, updateCartSelected, removeCart, finishShopping } from 'inventory/store/thunks';
// Icon
import { AddBagIconMedium } from '@core/components/Icons/BagIcon';
import { RemoveCartIconLarge } from '@core/components/Icons/CartIcon';
// Components
import { Button } from '@material-ui/core';
import AddItemInput from 'inventory/mobile/components/AddItemInput';
import ItemList from 'inventory/mobile/components/ItemList';
// Utils
import cartItemsToArray from 'inventory/utils/cartItemsToArray';
// Types
import { RootState, AppDispatch } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  list: {
    height: '73%',
    overflowY: 'auto'
  },
  finishButton: {
    marginTop: '0.5em',
    fontSize: '3.5em'
  }
}));

const Cart: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groceries, cart } = useSelector((state: RootState) => state.inventoryStore); 

  const listItems = cartItemsToArray(cart, groceries)

  const handleItemSelection = (selected: string[]) => {
    dispatch(updateCartSelected(selected));
  }
  const handleRemoveItem = (id: string) => {
    dispatch(removeCart([id]));
  }
  const handleAddToCart = (id: string) => {
    dispatch(addCart([id]));
  }
  const handleFinishShopping = () => {
    dispatch(finishShopping());
  }

  return (
    <>
      <AddItemInput
        targetCollection={cart} 
        onChange={handleAddToCart} 
      />
      <div className={classes.list}>
        <ItemList 
          listItems={listItems}
          onItemSelection={handleItemSelection}
          rowIcons={[
            { icon: <RemoveCartIconLarge />, handler: handleRemoveItem }
          ]}
        />
      </div>
      <Button 
        className={classes.finishButton}
        variant="outlined" 
        color="primary" 
        fullWidth
        onClick={handleFinishShopping}
        endIcon={<AddBagIconMedium />}
      >
        Finish Shopping
      </Button>
    </>
  )
}

export default Cart;