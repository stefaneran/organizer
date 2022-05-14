import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { addCart, removeInventory } from 'inventory/store/thunks';
// Icons
import { RemoveBagIconLarge } from '@core/components/Icons/BagIcon';
import { AddCartIconLarge } from '@core/components/Icons/CartIcon';
// Components
import { TextField } from '@material-ui/core'
import ItemList from 'inventory/mobile/components/ItemList';
// Utils
import availableItemsToArray from 'inventory/utils/availableItemsToArray';
// Types
import { InputEvent, RootState, AppDispatch } from '@core/types';

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

const Inventory: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groceries, inventory } = useSelector((state: RootState) => state.inventoryStore); 

  const [textFilter, setTextFilter] = React.useState('');

  const listItems = availableItemsToArray({ inventory, groceries, textFilter }) 

  const handleTextFilterInput = (event: InputEvent) => {
    setTextFilter(event.target.value)
  }
  const handleRemoveItem = (id: string) => {
    dispatch(removeInventory([id]));
  }
  const handleAddToCart = (id: string) => {
    dispatch(addCart([id]));
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