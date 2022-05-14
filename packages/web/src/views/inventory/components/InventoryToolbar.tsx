import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { addCart } from 'inventory/store/thunks';
// Icons
import { BagIconXS, BagIconWhiteXS } from '@core/components/Icons/BagIcon';
import { DatabaseIconXS, DatabaseIconWhiteXS } from '@core/components/Icons/DatabaseIcon';
// Components
import { IconButton, Button, Tooltip } from '@material-ui/core';
// Utils
import getMissingEssentialGroceries from 'inventory/utils/getMissingEssentialGroceries';
// Types 
import { RootState, AppDispatch } from '@core/types';
import { SelectedInventory } from 'inventory/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex',
    padding: '0.3em 0.5em',
    '& > button': {
      marginRight: '1em'
    },
    '& .selected': {
      background: '#3f51b5'
    }
  }
}))

interface Props {
  isSelectedTab: boolean;
  selectedInventory: SelectedInventory; 
  onSelectInventory: (type: SelectedInventory) => () => void;
}

const InventoryToolbar: React.FC<Props> = ({
  isSelectedTab,
  selectedInventory,
  onSelectInventory
}) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groceries, inventory, cart } = useSelector((state: RootState) => state.inventoryStore)

  const missingEssentials = getMissingEssentialGroceries(groceries, inventory, cart);

  const handleAddEssentials = () => {
    dispatch(addCart(missingEssentials.missing));
  }

  return (
    <div className={classes.container}>
      <Tooltip title="Groceries">
        <IconButton 
          onClick={onSelectInventory(SelectedInventory.All)} 
          className={selectedInventory === SelectedInventory.All ? 'selected' : ''}
        >
          {selectedInventory === SelectedInventory.All ? <DatabaseIconWhiteXS /> : <DatabaseIconXS />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Available Inventory">
        <IconButton 
          onClick={onSelectInventory(SelectedInventory.Available)} 
          className={selectedInventory === SelectedInventory.Available ? 'selected' : ''}
        >
          {selectedInventory === SelectedInventory.Available ? <BagIconWhiteXS /> : <BagIconXS />}
        </IconButton>
      </Tooltip>
      {isSelectedTab && missingEssentials.total > 0 ? (
        <Button
          onClick={handleAddEssentials}
          variant="outlined" 
          color="primary"
        >
          {`${missingEssentials.total} essentials missing`} 
        </Button>
      ) : null}
    </div>
  )
}

export default InventoryToolbar;