import * as React from 'react';
import { FormControl, FormHelperText, TextField, InputLabel } from '@material-ui/core';

interface TextInputProps {
  name: string;
  handleChange: (name: string, value: any) => void;
  label: string;
  className?: string;
  shouldFocus?: boolean;
  helperText?: string;
  inputValue?: string;
  variant?;
  size?;
}

// TODO make name and other wizard-related optional
const TextInput = ({ 
  name, 
  handleChange, 
  label, 
  className, 
  shouldFocus, 
  helperText, 
  inputValue, 
  variant, 
  size 
}: TextInputProps) => {

  const handleInput = event => {
    handleChange(name, event.target.value);
  }

  return (
    <FormControl className={'fullWidth'}>
      <TextField 
        className={className}
        label={label}
        value={inputValue} 
        onChange={handleInput} 
        inputRef={input => input && shouldFocus && input.focus()}
        variant={variant}
        size={size}
      />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default TextInput;