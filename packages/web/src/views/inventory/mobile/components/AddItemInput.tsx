import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import MobileAutocomplete from '@core/components/inputs/MobileAutocomplete';
// Utils
import getNameOptions from 'inventory/utils/getNameOptions';
// Types
import { Option, RootState } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  margin: {
    margin: '0.5em 0'
  }
}));

interface Props {
  targetCollection: string[];
  onChange: (id: string) => void;
}

const AddItemInput: React.FC<Props> = ({
  targetCollection, 
  onChange 
}) => {
  const classes = useStyles();
  const { groceries } = useSelector((state: RootState) => state.inventoryStore); 

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