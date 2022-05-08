import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'; 
import { connector, ReduxProps, DispatchProps } from 'inventory/container/InventoryConnector';
// Components
import Cart from 'inventory/components/Cart';
import Inventory from 'inventory/components/Inventory';
// Utils
import mapActions from 'inventory/utils/mapActions';
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { OrganizerModule } from '@core/types';
import { InventoryTabs } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center'
  }
}));

const InventoryContainer: React.FC<ReduxProps & DispatchProps> = ({
  loggedIn,
  lastUpdate,
  groceries,
  inventory,
  cart,
  cartSelected,
  ...actionProps
}) => {
  const classes = useStyles();
  const actions = mapActions(actionProps);

  const [selectedTab, setSelectedTab] = React.useState(InventoryTabs.Cart);

  const handleSelectTab = (selected: InventoryTabs) => () => setSelectedTab(selected);

  React.useEffect(() => {
    const isDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Inventory, lastUpdate);
    if (loggedIn && !isDataUpToDate) {
      actionProps.getItems();
    }
  }, [loggedIn])

  return (
    <Paper className={classes.container}>
      <Cart 
        groceries={groceries}
        cart={cart}
        cartSelected={cartSelected}
        actions={actions}
        isSelectedTab={selectedTab === InventoryTabs.Cart}
        setSelectedTab={handleSelectTab}
      />
      <Inventory 
        groceries={groceries}
        inventory={inventory} 
        cart={cart} 
        actions={actions} 
        isSelectedTab={selectedTab === InventoryTabs.Inventory}
        setSelectedTab={handleSelectTab}
      />
    </Paper>
  )
}

export default connector(InventoryContainer);