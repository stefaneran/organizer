import * as React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

interface ITextInputProps {
  data: {
    name: string;
    type: string;
    handleChange: (name: string, value: any) => () => void;
    label: string;
    helperText?: string;
  }
}

const TextInput = ({ data: { name, type, handleChange, label, helperText } }: ITextInputProps) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Input type="text" onChange={handleChange(name, type)} />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default TextInput;