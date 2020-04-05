import * as React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

interface INumberInputProps {
  shouldFocus: boolean;
  data: {
    name: string;
    handleChange: (name: string, value: any) => void;
    label: string;
    helperText?: string;
    inputValue?: string;
  }
}

const NumberInput = ({ shouldFocus, data: { name, handleChange, label, helperText, inputValue } }: INumberInputProps) => {

  const handleInput = event => {
    handleChange(name, event.target.value);
  }

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Input type="number" value={inputValue} onChange={handleInput} inputRef={input => input && shouldFocus && input.focus()} />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default NumberInput;