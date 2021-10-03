import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { RemoveBagIconLarge } from '@core/components/Icons/BagIcon';
import { AddCartIconLarge } from '@core/components/Icons/CartIcon';
import ItemList from 'inventory/mobile/components/ItemList';
import availableItemsToArray from 'inventory/utils/availableItemsToArray';
import { InventoryActions, InventoryItemEdit } from 'inventory/types';
import { InputEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  textFilter: {
    margin: '0.2em 0 0.5em 0',
    fontSize: '3rem',
    '& label': {
      fontSize: '3rem'
    },
    '& > div': {
      fontSize: '3rem'
    }
  },
  list: {
    height: '85%',
    overflowY: 'auto'
  }
}));

interface Props {
  allItems: Record<string, InventoryItemEdit>;
  availableItems: string[];
  actions: InventoryActions;
}

const Inventory: React.FC<Props> = ({ 
  allItems, 
  availableItems, 
  actions 
}) => {
  const classes = useStyles();

  const [textFilter, setTextFilter] = React.useState('');

  const listItems = availableItemsToArray({ availableItems, allItems, textFilter }) 

  const handleTextFilterInput = (event: InputEvent) => {
    setTextFilter(event.target.value)
  }
  const handleRemoveItem = (id: string) => {
    actions.inventory.removeFromAvailable([id]);
  }
  const handleAddToCart = (id: string) => {
    actions.cart.add([id]);
  }
  
  return (
    <>
      <TextField
        className={classes.textFilter}
        value={textFilter}
        onChange={handleTextFilterInput}
        placeholder="Text Search"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <div className={classes.list}>
        <ItemList 
          listItems={listItems}
          selectedItems={undefined}
          rowIcons={[
            { icon: <RemoveBagIconLarge />, handler: handleRemoveItem },
            { icon: <AddCartIconLarge />, handler: handleAddToCart }
          ]}
        />
      </div>
    </>
  )
}

export default Inventory;