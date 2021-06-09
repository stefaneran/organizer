import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import getNameOptions from '@inventory/utils/getNameOptions';
import { InventoryItem } from '@inventory/types';
import { AutoCompleteHandler } from '@core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  input: {
    margin: '1.5em 0',
    paddingLeft: '1em',
    width: '99%'
  }
}))

interface Props {
  allItems: Record<string, InventoryItem>;
  targetCollection: string[];
  onChange: (value: string) => void;
}

const AddItemInput: React.FC<Props> = ({ 
  allItems, 
  targetCollection, 
  onChange 
}) => {
  const classes = useStyles();

  const nameOptions = getNameOptions(allItems, targetCollection);

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
          label="Item To Add"  
          size="small" 
          variant="outlined" 
        />
      }
    />
  )
}

export default AddItemInput;