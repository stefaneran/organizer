import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import AvailableItems from '@inventory/components/AvailableItems';
import AllItems from '@inventory/components/AllItems';
import InventoryTabs from '@inventory/interfaces/InventoryTabs.enum';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
    margin: '1em'
  }
}))

const Inventory = ({ 
  allItems, 
  availableItems, 
  cart, 
  actions, 
  isSelectedTab, 
  setSelectedTab 
}) => {
  const classes = useStyles();
  return (
    <div 
      className={classes.container} 
      style={{ 
        width: isSelectedTab ? '80%' : '20%',
        background: isSelectedTab ? '' : 'rgba(0, 0, 0, 0.05)',
        cursor: isSelectedTab ? '' : 'pointer'
      }}
      onClick={!isSelectedTab && setSelectedTab(InventoryTabs.Inventory)}
    >
      <Typography variant="h4">
        Inventory
      </Typography>
      <div className={classes.contentContainer}>
        <AvailableItems 
          isSelectedTab={isSelectedTab}
          allItems={allItems} 
          availableItems={availableItems}
          actions={actions}
        />
        <Divider className={classes.divider} />
        <AllItems 
          isSelectedTab={isSelectedTab}
          allItems={allItems} 
          availableItems={availableItems}
          cart={cart}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default Inventory;