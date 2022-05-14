import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { getItems } from 'inventory/store/thunks';
// Components
import { Paper } from '@material-ui/core'; 
import Cart from 'inventory/components/Cart';
import Inventory from 'inventory/components/Inventory';
// Utils
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { OrganizerModule, RootState, AppDispatch } from '@core/types';
import { InventoryTabs } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center'
  }
}));

const InventoryContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.app.user);
  const { lastUpdate } = useSelector((state: RootState) => state.inventoryStore);

  const [selectedTab, setSelectedTab] = React.useState(InventoryTabs.Cart);

  const handleSelectTab = (selected: InventoryTabs) => () => setSelectedTab(selected);

  React.useEffect(() => {
    const isDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Inventory, lastUpdate);
    if (loggedIn && !isDataUpToDate) {
      dispatch(getItems());
    }
  }, [loggedIn])

  return (
    <Paper className={classes.container}>
      <Cart 
        isSelectedTab={selectedTab === InventoryTabs.Cart}
        setSelectedTab={handleSelectTab}
      />
      <Inventory
        isSelectedTab={selectedTab === InventoryTabs.Inventory}
        setSelectedTab={handleSelectTab}
      />
    </Paper>
  )
}

export default InventoryContainer;