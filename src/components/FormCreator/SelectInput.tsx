import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IOption {
  label: string;
  value: any;
}

interface ITextInputProps {
  data: {
    name: string;
    type: string;
    handleChange: (name: string, value: any) => (event) => void;
    label: string;
    options: IOption[]
    isMulti?: boolean;
  }
}

const SelectInput = ({ data: { name, type, handleChange, label, options, isMulti } }: ITextInputProps) => {
  const [value, setValue] = React.useState(null);

  const handleSelect = event => {
    const { value } = event.target;
    setValue(value);
    handleChange(name, type)(event);
  }

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
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