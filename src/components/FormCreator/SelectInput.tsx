import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IOption {
  label: string;
  value: any;
}

interface ISelectInputProps {
  data: {
    name: string;
    handleChange: (name: string, value: any) => void;
    label: string;
    options: IOption[];
    isMulti?: boolean;
    inputValue?: any | any[];
  }
}

const setDefault = (inputValue, isMulti) => 
  inputValue ? inputValue : (isMulti ? [] : '');

const SelectInput = ({ data: { name, handleChange, label, options, isMulti, inputValue } }: ISelectInputProps) => {

  const handleSelect = event => {
    handleChange(name, event.target.value);
  }

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        value={inputValue || setDefault(inputValue, isMulti)}
        onChange={handleSelect}
        multiple={isMulti}
      >
        {options && options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;