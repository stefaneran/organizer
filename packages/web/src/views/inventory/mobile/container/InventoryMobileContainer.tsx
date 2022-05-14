import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from 'inventory/store/thunks';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BagIconLarge } from '@core/components/Icons/BagIcon';
import { CartIconLargeFill } from '@core/components/Icons/CartIcon';
// Components
import { Typography } from '@material-ui/core';
import Cart from 'inventory/mobile/components/Cart';
import Inventory from 'inventory/mobile/components/Inventory';
// Utils
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { OrganizerModule, RootState, AppDispatch } from '@core/types';

const useStyles = makeStyles(() => createStyles({
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

const InventoryMobileContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.app.user); 
  const { lastUpdate } = useSelector((state: RootState) => state.inventoryStore);

  const [currentView, setCurrentView] = React.useState(ViewType.Cart);

  const isCart = currentView === ViewType.Cart;

  const handleChangeView = () => {
    if (isCart) {
      setCurrentView(ViewType.Inventory)
    } else {
      setCurrentView(ViewType.Cart)
    }
  }

  React.useEffect(() => {
    const isDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Inventory, lastUpdate);
    if (loggedIn && !isDataUpToDate) {
      dispatch(getItems());
    }
  }, [loggedIn])

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
          <Cart />
        </div>
        <div className={classes.contentWindow} style={{ left: isCart ? '100%' : '0%'}}>
          <Inventory />
        </div>
      </div>
    </div>
  )
}

export default InventoryMobileContainer;