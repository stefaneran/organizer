import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AddBagIconMedium } from 'core/components/Icons/BagIcon';
import { RemoveCartIconLarge } from 'core/components/Icons/CartIcon';
import AddItemInput from 'inventory/mobile/components/AddItemInput';
import ItemList from 'inventory/mobile/components/ItemList';
import cartItemsToArray from 'inventory/utils/cartItemsToArray';
import { InventoryActions, InventoryItem } from 'inventory/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  list: {
    height: '73%',
    overflowY: 'auto'
  },
  finishButton: {
    marginTop: '0.5em',
    fontSize: '3.5em'
  }
}));

interface Props {
  cart: string[];
  selectedInCart: string[];
  allItems: Record<string, InventoryItem>;
  actions: InventoryActions;
}

const Cart: React.FC<Props> = ({
  cart,
  selectedInCart,
  allItems,
  actions
}) => {
  const classes = useStyles();
  const listItems = cartItemsToArray(cart, allItems)

  const handleItemSelection = (selected: string[]) => {
    actions.cart.updateSelected(selected);
  }
  const handleRemoveItem = (id: string) => {
    actions.cart.remove([id]);
  }
  const handleAddToCart = (id: string) => {
    actions.cart.add([id]);
  }
  const handleFinishShopping = () => {
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