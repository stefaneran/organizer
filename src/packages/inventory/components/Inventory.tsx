import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
// Icons
import { BagIconXS, BagIconWhiteXS } from '@core/components/Icons/BagIcon';
import { DatabaseIconXS, DatabaseIconWhiteXS } from '@core/components/Icons/DatabaseIcon';
// Components
import InventoryAll from 'inventory/components/InventoryAll';
import InventoryAvailable from 'inventory/components/InventoryAvailable';
// Utils
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
  inventoryButtons: {
    display: 'flex',
    '& > button': {
      marginRight: '1em'
    },
    '& .selected': {
      background: '#3f51b5'
    }
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

  const [selectedInventory, setSelectedInventory] = React.useState<'available' | 'all'>('available')

  const handleSelectInventory = (type: 'available' | 'all') => () => {
    setSelectedInventory(type)
  }

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
      <div className={classes.inventoryButtons}>
        <Tooltip title="All Items">
          <IconButton 
            onClick={handleSelectInventory('all')} 
            className={selectedInventory === 'all' ? 'selected' : ''}
          >
            {selectedInventory === 'all' ? <DatabaseIconWhiteXS /> : <DatabaseIconXS />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Available Inventory">
          <IconButton 
            onClick={handleSelectInventory('available')} 
            className={selectedInventory === 'available' ? 'selected' : ''}
          >
            {selectedInventory === 'available' ? <BagIconWhiteXS /> : <BagIconXS />}
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.contentContainer}>
        {selectedInventory === 'available' ? (
          <InventoryAvailable
            allItems={allItems}
            availableItems={availableItems}
            isSelectedTab={isSelectedTab}
            actions={actions}
          />
        ) : (
          <InventoryAll
            allItems={allItems}
            availableItems={availableItems}
            cart={cart}
            isSelectedTab={isSelectedTab}
            actions={actions}
          />
        )}
      </div>
    </div>
  )
}

export default Inventory;