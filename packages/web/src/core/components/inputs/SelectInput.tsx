import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SelectEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  formControl: {
    minWidth: 120
  }
}));

const getOptions = (native, options, getters) => {
  if (native) {
    return options?.map((option, index) => (
      <option 
        key={getters.getOptionKey?.(option, index) ?? option} 
        value={getters.getOptionValue?.(option, index) ?? option}
      >
        {getters.getOptionLabel?.(option, index) ?? option}
      </option>
    )) ?? null
  } else {
    return options?.map((option, index) => (
      <MenuItem 
        key={getters.getOptionKey?.(option, index) ?? option} 
        value={getters.getOptionValue?.(option, index) ?? option}
      >
        {getters.getOptionLabel?.(option, index) ?? option}
      </MenuItem>
    )) ?? null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

interface Props {
  value: Any;
  options: Any[]; 
  onChange: (event: SelectEvent<Any>) => void; 
  className?: string; 
  label?: string;
  inputProps?: Any;
  native?: boolean;
  // Accessors for specific values - Defaults to direct access if none provided
  // Default: (option) => option
  getOptionKey?: (option: Any, index?: number) => Any; 
  getOptionValue?: (option: Any, index?: number) => Any; 
  getOptionLabel?: (option: Any, index?: number) => Any; 
}

const SelectInput: React.FC<Props> = ({ 
  value, 
  options, 
  onChange, 
  className, 
  label, 
  native,
  getOptionKey,
  getOptionValue,
  getOptionLabel,
  ...props
}) => {
  const classes = useStyles();
  return (
    <FormControl 
      className={clsx(classes.formControl, className)} 
      variant="outlined"
    >
      <InputLabel id={`select-input-${label}`}>{label}</InputLabel>
      <Select
        native={native}
        labelId={`select-input-${label}`}
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        {...props}
      >
        {getOptions(native, options, { getOptionKey, getOptionValue, getOptionLabel })}
      </Select>
    </FormControl>
  )
}

export default SelectInput;