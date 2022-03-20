import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import getNameOptions from 'inventory/utils/getNameOptions';
import { GroceryItemEdit } from 'inventory/types';
import { AutoCompleteHandler } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  input: {
    margin: '1.5em 0',
    paddingLeft: '1em',
    width: '99%'
  }
}))

interface Props {
  groceries: Record<string, GroceryItemEdit>;
  targetCollection: string[];
  onChange: (value: string) => void;
}

const AddGroceryInput: React.FC<Props> = ({ 
  groceries, 
  targetCollection, 
  onChange 
}) => {
  const classes = useStyles();

  const nameOptions = getNameOptions(groceries, targetCollection);

  const handleNameSelect: AutoCompleteHandler = (e, newValue) => {
    if (newValue) {
      onChange(newValue.value)
    }
  }

  return (
    <Autocomplete
      className={classes.input}
      options={nameOptions}
      onChange={handleNameSelect}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => 
        <TextField 
          {...params}
          label="Grocery Item To Add"  
          size="small" 
          variant="outlined" 
        />
      }
    />
  )
}

export default AddGroceryInput;