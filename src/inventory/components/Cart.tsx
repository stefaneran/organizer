import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Tooltip } from '@material-ui/core';
import ItemList from '@inventory/components/ItemList';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { RemoveCartIconSmall } from '@core/components/Icons/CartIcon';
import { AddBagIconXS } from '@core/components/Icons/BagIcon';
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
  const hasSelectedItems = Boolean(selectedInCart.length);

  const handleItemSelection = (newSelected) => {
    actions.cart.updateSelected(newSelected);
  }
  const handleRemoveItem = (id) => {
    actions.cart.remove([id]);
  }
  const handleRemoveSelected = () => {
    actions.cart.remove(selectedInCart);
  }
  const handleFinishShopping = ({ onlyChecked }) => (e) => {
    e.stopPropagation();
    actions.cart.finishShopping(onlyChecked);
  }

  return (
    <div 
      className={classes.container} 
      style={{
        width: isSelectedTab ? '70%' : '30%',
        background: isSelectedTab ? '' : 'rgba(0, 0, 0, 0.05)',
        cursor: isSelectedTab ? '' : 'pointer'
      }}
      onClick={!isSelectedTab && setSelectedTab(InventoryTabs.Cart)}
    >
      <Typography variant="h4">
        Cart
      </Typography>
      <div className={classes.contentContainer}>
        <div style={{ flexGrow: isSelectedTab ? 3 : 1 }}>
          <ItemList 
            isSelectedTab={isSelectedTab}
            listItems={listItems} 
            selectedItems={selectedInCart} 
            onItemSelection={handleItemSelection} 
            onRemoveItem={handleRemoveItem}
            removeIcon={RemoveCartIconSmall}
          />
        </div>
        {isSelectedTab && hasSelectedItems && (
          <div style={{ flexGrow: 1 }}>
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
      <Tooltip title="Add All to Available">
        <Button 
          style={{ marginRight: '2em' }}
          variant="outlined" 
          color="primary" 
          onClick={handleFinishShopping({ onlyChecked: false })}
          endIcon={<AddBagIconXS />}
        >
          Finish
        </Button>
      </Tooltip>
      <Tooltip title="Add Only Selected to Available">
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleFinishShopping({ onlyChecked: true })}
          startIcon={<CheckBoxOutlinedIcon />}
          endIcon={<AddBagIconXS />}
        >
          Finish
        </Button>
      </Tooltip>
    </div>
  )
}

export default Cart;