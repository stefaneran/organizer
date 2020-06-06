import * as React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

interface TextInputProps {
  shouldFocus: boolean;
  data: {
    name: string;
    handleChange: (name: string, value: any) => void;
    label: string;
    helperText?: string;
    inputValue?: string;
  }
}

const TextInput = ({ shouldFocus, data: { name, handleChange, label, helperText, inputValue } }: TextInputProps) => {

  const handleInput = event => {
    handleChange(name, event.target.value);
  }

  return (
    <FormControl className={'fullWidth'}>
      <InputLabel>{label}</InputLabel>
      <Input 
        type="text" 
        value={inputValue} 
        onChange={handleInput} 
        inputRef={input => input && shouldFocus && input.focus()}
      />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default TextInput;