import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Cart from '@inventory/components/Cart';
import Inventory from '@inventory/components/Inventory';
import mapActions from '@inventory/utils/mapActions';
import { InventoryTabs, InventoryItem } from '@inventory/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center'
  }
}));

interface Props {
  allItems: Record<string, InventoryItem>;
  availableItems: string[];
  cart: string[];
  selectedInCart: string[];
}

const InventoryContainer: React.FC<Props & Record<string, Function>> = ({
  allItems,
  availableItems,
  cart,
  selectedInCart,
  ...actionProps
}) => {
  
  const classes = useStyles();
  
  const actions = mapActions(actionProps);

  const [selectedTab, setSelectedTab] = React.useState(InventoryTabs.Cart);

  const handleSelectTab = (selected: InventoryTabs) => () => setSelectedTab(selected);

  return (
    <Paper className={classes.container}>
      <Cart 
        cart={cart} 
        selectedInCart={selectedInCart}
        actions={actions} 
        allItems={allItems}
        isSelectedTab={selectedTab === InventoryTabs.Cart}
        setSelectedTab={handleSelectTab}
      />
      <Inventory 
        cart={cart} 
        availableItems={availableItems} 
        allItems={allItems}
        actions={actions} 
        isSelectedTab={selectedTab === InventoryTabs.Inventory}
        setSelectedTab={handleSelectTab}
      />
    </Paper>
  )
}

export default InventoryContainer;