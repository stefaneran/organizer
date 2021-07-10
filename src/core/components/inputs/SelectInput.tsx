import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SelectEvent } from '@core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    minWidth: 120
  }
}));

interface Props {
  value: any;
  options: any[]; 
  onChange: (event: SelectEvent<any>) => void; 
  className?: string; 
  label?: string;
  fullWidth?: boolean;
  // Accessors for specific values - Defaults to direct access if none provided
  // Default: (option) => option
  getOptionKey?: (option: any, index?: number) => any; 
  getOptionValue?: (option: any, index?: number) => any; 
  getOptionLabel?: (option: any, index?: number) => any; 
}

const SelectInput: React.FC<Props> = ({ 
  value, 
  options, 
  onChange, 
  className, 
  label, 
  fullWidth,
  ...accessors 
}) => {
  const classes = useStyles();
  return (
    <FormControl className={clsx(classes.formControl, className)} variant="outlined">
      <InputLabel id={`select-input-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-input-${label}`}
        label={label}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
      >
        {options?.map((option, index) => (
          <MenuItem 
            key={accessors.getOptionKey?.(option, index) ?? option} 
            value={accessors.getOptionValue?.(option, index) ?? option}
          >
            {accessors.getOptionLabel?.(option, index) ?? option}
          </MenuItem>
        )) ?? null}
      </Select>
    </FormControl>
  )
}

export default SelectInput;