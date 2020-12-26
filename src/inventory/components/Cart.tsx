import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import ItemList from '@inventory/components/ItemList';
import InventoryTabs from '@inventory/interfaces/InventoryTabs.enum';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '1em',
    display: 'inline-block',
    overflow: 'hidden',
    transition: 'width 300ms'
  },
  contentContainer: {
    height: '85%',
    overflowY: 'auto'
  },
  listContainer: {
    display: 'flex'
  }
}))

const cartItemsToArray = (cart, allItems) => 
  cart.map(id => ({ 
    id, 
    name: allItems[id].name, 
    category: allItems[id].category  
  }))

const Cart = ({ 
  cart, 
  selectedInCart,
  actions, 
  allItems, 
  isSelectedTab, 
  setSelectedTab 
}) => {

  const classes = useStyles();
  const listItems = cartItemsToArray(cart, allItems)

  const handleItemSelection = (newSelected) => {
    actions.cart.updateSelected(newSelected);
  }
  const handleFinishShopping = (e) => {
    e.stopPropagation();
    actions.cart.finishShopping();
  }

  return (
    <div 
      className={classes.container} 
      style={{
        width: isSelectedTab ? '80%' : '20%',
        background: isSelectedTab ? '' : 'rgba(0, 0, 0, 0.05)',
        cursor: isSelectedTab ? '' : 'pointer'
      }}
      onClick={!isSelectedTab && setSelectedTab(InventoryTabs.Cart)}
    >
      <Typography variant="h4">
        Cart
      </Typography>
      <div className={classes.contentContainer}>
        <ItemList 
          isSelectedTab={isSelectedTab}
          listItems={listItems} 
          selectedItems={selectedInCart} 
          onItemSelection={handleItemSelection} 
        />
      </div>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleFinishShopping}
      >
        Finish Shopping
      </Button>
    </div>
  )
}

export default Cart;