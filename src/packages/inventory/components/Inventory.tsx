import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import InventoryAll from 'inventory/components/InventoryAll';
import InventoryAvailable from 'inventory/components/InventoryAvailable';
import { InventoryTabs, InventoryItemEdit, InventoryActions } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    padding: '1em',
    display: 'inline-block',
    overflow: 'hidden',
    transition: 'width 300ms'
  },
  contentContainer: {
    height: '95%',
    overflowY: 'auto'
  },
  divider: {
    margin: '1em 0'
  }
}))

interface Props {
  allItems: Record<string, InventoryItemEdit>; 
  availableItems: string[]; 
  cart: string[]; 
  actions: InventoryActions; 
  isSelectedTab: boolean; 
  setSelectedTab: (selected: InventoryTabs) => () => void;
}

const Inventory: React.FC<Props> = ({ 
  allItems, 
  availableItems, 
  cart, 
  actions, 
  isSelectedTab, 
  setSelectedTab 
}) => {
  const classes = useStyles();

  const dynamicStyles = { 
    width: isSelectedTab ? '70%' : '30%',
    background: isSelectedTab ? '' : 'rgba(0, 0, 0, 0.05)',
    cursor: isSelectedTab ? '' : 'pointer'
  }

  return (
    <div 
      className={classes.container} 
      style={dynamicStyles}
      onClick={!isSelectedTab ? setSelectedTab(InventoryTabs.Inventory) : undefined}
    >
      <Typography variant="h4">
        Inventory
      </Typography>
      <div className={classes.contentContainer}>
        <InventoryAvailable
          allItems={allItems}
          availableItems={availableItems}
          isSelectedTab={isSelectedTab}
          actions={actions}
        />
        <Divider className={classes.divider} />
        <InventoryAll
          allItems={allItems}
          availableItems={availableItems}
          cart={cart}
          isSelectedTab={isSelectedTab}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default Inventory;