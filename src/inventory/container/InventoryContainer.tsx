import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Cart from '@inventory/components/Cart';
import Inventory from '@inventory/components/Inventory';
import mapActions from '@inventory/utils/mapActions';
import InventoryTabs from '@inventory/interfaces/InventoryTabs.enum';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center'
  }
}));

const InventoryContainer = (props) => {
  const classes = useStyles();

  const { cart, availableItems, allItems } = props;
  const actions = mapActions(props);

  const [selectedTab, setSelectedTab] = React.useState(InventoryTabs.Cart);

  const handleSelectTab = (selected: InventoryTabs) => () => setSelectedTab(selected);

  return (
    <Paper className={classes.container}>
      <Cart 
        cart={cart} 
        actions={actions.cart} 
        selected={selectedTab === InventoryTabs.Cart}
        setSelected={handleSelectTab}
      />
      <Inventory 
        availableItems={availableItems} 
        allItems={allItems}
        actions={actions.inventory} 
        selected={selectedTab === InventoryTabs.Inventory}
        setSelected={handleSelectTab}
      />
    </Paper>
  )
}

export default InventoryContainer;