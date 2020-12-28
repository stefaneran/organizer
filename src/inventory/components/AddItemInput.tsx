import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import genericSort from '@core/utils/genericSort';

const useStyles = makeStyles((theme: Theme) => createStyles({
  input: {
    margin: '1.5em 0',
    paddingLeft: '1em',
    width: '99%'
  }
}))

const getNameOptions = (allItems, targetCollection) => {
  const names = [];
  Object.keys(allItems).forEach(id => {
    if (!targetCollection.includes(id)) {
      names.push({ 
        label: allItems[id].name, 
        value: id 
      });
    }
  })
  return names.sort((a, b) => genericSort(a.label, b.label));
}

const AddItemInput = ({ allItems, targetCollection, onChange }) => {
  const classes = useStyles();

  const nameOptions = getNameOptions(allItems, targetCollection);

  const handleNameSelect = (e, newValue) => {
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