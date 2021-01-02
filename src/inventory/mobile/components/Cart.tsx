import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AddBagIconMedium } from '@core/components/Icons/BagIcon';
import { RemoveCartIconLarge } from '@core/components/Icons/CartIcon';
import AddItemInput from '@inventory/mobile/components/AddItemInput';
import ItemList from '@inventory/mobile/components/ItemList';
import cartItemsToArray from '@inventory/utils/cartItemsToArray';

const useStyles = makeStyles((theme: Theme) => createStyles({
  list: {
    height: '80%',
    overflowY: 'auto'
  },
  finishButton: {
    marginTop: '0.5em',
    fontSize: '3.5em'
  }
}));

const Cart = ({
  cart,
  selectedInCart,
  allItems,
  actions
}) => {
  const classes = useStyles();
  const listItems = cartItemsToArray(cart, allItems)

  const handleItemSelection = (newSelected) => {
    actions.cart.updateSelected(newSelected);
  }
  const handleRemoveItem = (id) => {
    actions.cart.remove([id]);
  }
  const handleAddToCart = (id) => {
    actions.cart.add([id]);
  }
  const handleFinishShopping = (e) => {
    actions.cart.finishShopping();
  }

  return (
    <>
      <AddItemInput 
        allItems={allItems} 
        targetCollection={cart} 
        onChange={handleAddToCart} 
      />
      <div className={classes.list}>
        <ItemList 
          listItems={listItems}
          selectedItems={selectedInCart} 
          onItemSelection={handleItemSelection}
          iconActions={[
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