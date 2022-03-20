import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'; 
import { connector, ReduxProps, DispatchProps } from 'inventory/container/InventoryConnector';
import Cart from 'inventory/components/Cart';
import Inventory from 'inventory/components/Inventory';
import mapActions from 'inventory/utils/mapActions';
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
    if (loggedIn) {
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