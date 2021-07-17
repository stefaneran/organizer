import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MobileAutocomplete from 'core/components/inputs/MobileAutocomplete';
import getNameOptions from 'inventory/utils/getNameOptions';
import { InventoryItem } from 'inventory/types';
import { Option } from 'core/types';

const useStyles = makeStyles(() => createStyles({
  margin: {
    margin: '0.5em 0'
  }
}));

interface Props {
  allItems: Record<string, InventoryItem>;
  targetCollection: string[];
  onChange: (id: string) => void;
}

const AddItemInput: React.FC<Props> = ({ 
  allItems, 
  targetCollection, 
  onChange 
}) => {
  const classes = useStyles();
  const nameOptions = getNameOptions(allItems, targetCollection);

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