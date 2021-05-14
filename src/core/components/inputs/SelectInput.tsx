import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    minWidth: 120
  }
}));

interface Props {
  value;
  onChange; 
  className?; 
  label?;
  options; 
  getOptionKey; 
  getOptionValue; 
  getOptionLabel; 
}

const SelectInput = ({ 
  value, 
  onChange, 
  className, 
  label, 
  options, 
  getOptionKey, 
  getOptionValue, 
  getOptionLabel 
}: Props) => {
  const classes = useStyles();
  return (
    <FormControl className={clsx(classes.formControl, className)} variant="outlined">
      <InputLabel id={`select-input-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-input-${label}`}
        label={label}
        value={value}
        onChange={onChange}
        className={className}
      >
        {options?.map((option, index) => (
          <MenuItem 
            key={getOptionKey(option, index)} 
            value={getOptionValue(option, index)}
          >
            {getOptionLabel(option, index)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectInput;