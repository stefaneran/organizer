import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BagIconLarge } from '@core/components/Icons/BagIcon';
import { CartIconLargeFill } from '@core/components/Icons/CartIcon';
import Cart from '@inventory/mobile/components/Cart';
import Inventory from '@inventory/mobile/components/Inventory';
import mapActions from '@inventory/utils/mapActions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff',
    padding: '1.5em'
  },
  header: {
    textAlign: 'center'
  },
  navRight: {
    position: 'absolute',
    right: '3em',
    top: '-1em'
  },
  arrowIcon: {
    width: '4em', 
    height: '4em', 
    position: 'relative', 
    top: '2em', 
    color: '#3f51b5'
  }
}));

enum ViewType {
  Cart = "Cart",
  Inventory = "Inventory"
}

const InventoryMobileContainer = ({ 
  allItems,
  availableItems,
  cart,
  selectedInCart,
  ...props
 }) => {
  const classes = useStyles();
  const actions = mapActions(props);

  const [currentView, setCurrentView] = React.useState(ViewType.Cart);

  const isCart = currentView === ViewType.Cart;

  const handleChangeView = () => {
    if (isCart) {
      setCurrentView(ViewType.Inventory)
    } else {
      setCurrentView(ViewType.Cart)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h1">
          {currentView}
        </Typography>
        <div 
          className={classes.navRight} 
          onClick={handleChangeView}
        >
          {isCart ? (
            <>
              <BagIconLarge />
              <ChevronRightIcon className={classes.arrowIcon} />
            </>
          ) : (
            <>
              <ChevronLeftIcon className={classes.arrowIcon} />
              <CartIconLargeFill />
            </>
          )}
        </div>
      </div>
      <div style={{ height: '95%' }}>
        {isCart ? (
          <Cart 
            cart={cart}
            selectedInCart={selectedInCart}
            allItems={allItems}
            actions={actions}
          />
        ) : (
          <Inventory 
            availableItems={availableItems}
            allItems={allItems}
            actions={actions}
          />
        )}
      </div>
    </div>
  )
}

export default InventoryMobileContainer;