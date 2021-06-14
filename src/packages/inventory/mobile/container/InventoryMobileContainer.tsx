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
import { InventoryItem } from '@inventory/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff'
  },
  header: {
    textAlign: 'center',
    paddingTop: '1.5em'
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
  },
  contentContainer: {
    height: '95%', 
    position: 'relative'
  },
  contentWindow: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    transition: 'left 300ms',
    padding: '1.5em'
  }
}));

enum ViewType {
  Cart = "Cart",
  Inventory = "Inventory"
}

interface Props {
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  cart: string[];
  selectedInCart: string[];
}

const InventoryMobileContainer: React.FC<Props & Record<string, Function>> = ({
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
      <div className={classes.contentContainer}>
        <div className={classes.contentWindow} style={{ left: isCart ? '0%' : '-100%' }}>
          <Cart 
            cart={cart}
            selectedInCart={selectedInCart}
            allItems={allItems}
            actions={actions}
          />
        </div>
        <div className={classes.contentWindow} style={{ left: isCart ? '100%' : '0%'}}>
          <Inventory 
            availableItems={availableItems}
            allItems={allItems}
            actions={actions}
          />
        </div>
      </div>
    </div>
  )
}

export default InventoryMobileContainer;