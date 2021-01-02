import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { RemoveBagIconMedium } from '@core/components/Icons/BagIcon';
import { AddCartIconMedium } from '@core/components/Icons/CartIcon';
import ItemList from '@inventory/mobile/components/ItemList';
import availableItemsToArray from '@inventory/utils/availableItemsToArray';

const useStyles = makeStyles((theme: Theme) => createStyles({
  textFilter: {
    margin: '1em 0 0.5em 0'
  },
  list: {
    height: '90%',
    overflowY: 'auto'
  }
}));

const Inventory = ({ availableItems, allItems, actions }) => {
  const classes = useStyles();

  const [textFilter, setTextFilter] = React.useState('');

  const listItems = availableItemsToArray(availableItems, allItems, textFilter)

  const handleTextFilterInput = (e) => {
    setTextFilter(e.target.value)
  }
  const handleRemoveItem = (id) => {
    actions.inventory.removeFromAvailable([id]);
  }
  const handleAddToCart = (id) => {
    actions.cart.add([id]);
  }
  
  return (
    <>
      <TextField
        className={classes.textFilter}
        value={textFilter}
        onChange={handleTextFilterInput}
        label="Text Search"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <div className={classes.list}>
        <ItemList 
          listItems={listItems}
          selectedItems={undefined}
          iconActions={[
            { icon: <RemoveBagIconMedium />, handler: handleRemoveItem },
            { icon: <AddCartIconMedium />, handler: handleAddToCart }
          ]}
        />
      </div>
    </>
  )
}

export default Inventory;