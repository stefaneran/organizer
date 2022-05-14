import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItemText, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { StateSetter, AutoCompleteHandler, InputEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  editContainer: {
    '& > span': {
      display: 'flex'
    }
  },
  nameInput: {
    width: '160px', 
    marginRight: '1em'
  },
  categoryInput: {
    width: '160px'
  }
}))

interface Props {
  groceryName: string;
  groceryCategory: string;
  categoryOptions: string[];
  setGroceryName: StateSetter<string>;
  setGroceryCategory: StateSetter<string>;
}

const InventoryListItemEdit: React.FC<Props> = ({
  groceryName,
  groceryCategory,
  categoryOptions,
  setGroceryName,
  setGroceryCategory
}) => {
  const classes = useStyles();

  const handleChangeName = (event: InputEvent) => {
    setGroceryName(event.target.value);
  }
  const handleCategorySelect: AutoCompleteHandler = (event, newValue) => {
    if (newValue) {
      setGroceryCategory(newValue);
    }
  }
  const handleCategoryInput = (event: InputEvent) => {
    setGroceryCategory(event.target.value);
  }

  return (
    <ListItemText className={classes.editContainer}>
      <TextField
        className={classes.nameInput}
        value={groceryName}
        onChange={handleChangeName}
        variant="outlined"
        size="small"
        placeholder="Name"
      />
      <Autocomplete
        className={classes.categoryInput}
        value={groceryCategory}
        options={categoryOptions}
        onChange={handleCategorySelect}
        getOptionLabel={(option) => option}
        noOptionsText={<></>}
        renderInput={(params) => 
          <TextField 
            {...params} 
            onChange={handleCategoryInput} 
            placeholder="Category"  
            size="small" 
            variant={'outlined'} 
          />
        }
      />
    </ListItemText>
  )
}

export default InventoryListItemEdit;