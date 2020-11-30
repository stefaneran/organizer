import * as React from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField,
  FormControl, 
  FormHelperText 
} from '@material-ui/core';

interface Props {
  name: string;
  label: string;
  handleChange: (name: string, value: any) => void;
  options: any[];
  className?: string;
  multiple?: boolean;
  canAdd?: boolean; // Can add new options by typing and pressing enter
  helperText?: string;
  variant?: any;
  size?: any;
  defaultValue?: any;
}

const TextMultiSelect = ({
  name, 
  label,
  handleChange, 
  options,
  className,
  multiple,
  canAdd,
  helperText, 
  variant, 
  size,
  defaultValue
}: Props) => {

  const [currentOptions, setCurrentOptions] = React.useState(options);
  const [currentValue, setCurrentValue] = React.useState(defaultValue ? defaultValue : []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && canAdd) {
      const input = e.target.value;
      if (!currentOptions.includes(input)) {
        const newOption = { label: input, value: input };
        setCurrentOptions([...currentOptions, newOption]);
        setCurrentValue([...currentValue, newOption]);
        handleChange(name, [...currentValue, newOption]);
      }
    }
  }

  const handleInput = (e, newValue) => {
    setCurrentValue(newValue);
    handleChange(name, newValue);
  }
  
  return (
    <FormControl className={'fullWidth'}>
      <Autocomplete
        className={className}
        multiple={multiple}
        value={currentValue}
        options={currentOptions}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} size={size} variant={variant || 'outlined'} label={label} />}
      />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default TextMultiSelect;