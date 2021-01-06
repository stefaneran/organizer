import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MobileAutocomplete from '@core/components/MobileAutocomplete';
import getNameOptions from '@inventory/utils/getNameOptions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  margin: {
    margin: '0.5em 0'
  }
}));

const AddItemInput = ({ allItems, targetCollection, onChange }) => {
  const classes = useStyles();
  const nameOptions = getNameOptions(allItems, targetCollection);

  const handleNameSelect = (newValue) => {
    if (newValue) {
      onChange(newValue.value)
    }
  }

  return (
    <MobileAutocomplete
      className={classes.margin}
      options={nameOptions}
      onChange={handleNameSelect}
      getOptionLabel={(option) => option.label}
      placeholder="Item To Add"  
      fullWidth
    />
  )
}

export default AddItemInput;