import * as React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

interface NumberInputProps {
  shouldFocus: boolean;
  name: string;
  handleChange: (name: string, value: any) => void;
  label: string;
  helperText?: string;
  inputValue?: string;
}

const NumberInput = ({ shouldFocus, name, handleChange, label, helperText, inputValue }: NumberInputProps) => {

  const handleInput = event => {
    handleChange(name, event.target.value);
  }

  return (
    <FormControl className={'fullWidth'}>
      <InputLabel>{label}</InputLabel>
      <Input type="number" value={inputValue} onChange={handleInput} inputRef={input => input && shouldFocus && input.focus()} />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default NumberInput;