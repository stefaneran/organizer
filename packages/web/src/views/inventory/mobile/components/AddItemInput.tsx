import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MobileAutocomplete from '@core/components/inputs/MobileAutocomplete';
import getNameOptions from 'inventory/utils/getNameOptions';
import { GroceryItemEdit } from 'inventory/types';
import { Option } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  margin: {
    margin: '0.5em 0'
  }
}));

interface Props {
  groceries: Record<string, GroceryItemEdit>;
  targetCollection: string[];
  onChange: (id: string) => void;
}

const AddItemInput: React.FC<Props> = ({ 
  groceries, 
  targetCollection, 
  onChange 
}) => {
  const classes = useStyles();
  const nameOptions = getNameOptions(groceries, targetCollection);

  const handleNameSelect = (newValue: Option) => {
    if (newValue) {
      onChange(newValue.value)
    }
  }

  return (
    <MobileAutocomplete
      className={classes.margin}
      options={nameOptions}
      onChange={handleNameSelect}
      getOptionLabel={(option: Option) => option.label}
      placeholder="Item To Add"  
      fullWidth
    />
  )
}

export default AddItemInput;