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
  itemName: string;
  itemCategory: string;
  categoryOptions: string[];
  setItemName: StateSetter<string>;
  setItemCategory: StateSetter<string>;
  toggleNutrition: (id?: string, isEdit?: boolean) => void;
}

const InventoryListItemEdit: React.FC<Props> = ({
  itemName,
  itemCategory,
  categoryOptions,
  setItemName,
  setItemCategory
}) => {
  const classes = useStyles();

  const handleChangeName = (event: InputEvent) => {
    setItemName(event.target.value);
  }
  const handleCategorySelect: AutoCompleteHandler = (event, newValue) => {
    if (newValue) {
      setItemCategory(newValue);
    }
  }
  const handleCategoryInput = (event: InputEvent) => {
    setItemCategory(event.target.value);
  }

  return (
    <ListItemText className={classes.editContainer}>
      <TextField
        className={classes.nameInput}
        value={itemName}
        onChange={handleChangeName}
        variant="outlined"
        size="small"
        placeholder="Name"
      />
      <Autocomplete
        className={classes.categoryInput}
        value={itemCategory}
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