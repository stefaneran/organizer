import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import { Typography } from '@material-ui/core';
import InventoryToolbar from 'inventory/components/InventoryToolbar';
import InventoryAll from 'inventory/components/InventoryAll';
import InventoryAvailable from 'inventory/components/InventoryAvailable';
// Utils
import { InventoryTabs, SelectedInventory } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    padding: '1em',
    paddingBottom: '5em', // Allows scroll to bottom without cutting off content
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
  isSelectedTab: boolean; 
  setSelectedTab: (selected: InventoryTabs) => () => void;
}

const Inventory: React.FC<Props> = ({
  isSelectedTab, 
  setSelectedTab 
}) => {
  const classes = useStyles();

  const [selectedInventory, setSelectedInventory] = React.useState<SelectedInventory>(SelectedInventory.Available);

  const handleSelectInventory = (type: SelectedInventory) => () => {
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
      <InventoryToolbar 
        isSelectedTab={isSelectedTab}
        selectedInventory={selectedInventory}
        onSelectInventory={handleSelectInventory}
      />
      <div className={classes.contentContainer}>
        {selectedInventory === SelectedInventory.Available ? (
          <InventoryAvailable isSelectedTab={isSelectedTab} />
        ) : (
          <InventoryAll isSelectedTab={isSelectedTab} />
        )}
      </div>
    </div>
  )
}

export default Inventory;