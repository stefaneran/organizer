import * as React from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField,
  FormControl, 
  FormHelperText 
} from '@material-ui/core';
import { AutoCompleteHandler, KeyboardEvent } from '@core/types';

interface Props {
  label: string;
  onChange: (value: any) => void;
  options: any[];
  className?: string;
  canAdd?: boolean; // Can add new options by typing and pressing enter
  helperText?: string;
  variant?: any;
  size?: any;
  defaultValue?: any;
}

const TextMultiSelect: React.FC<Props> = ({
  label,
  onChange, 
  defaultValue = [],
  options = [],
  className,
  canAdd,
  helperText, 
  variant, 
  size
}) => {

  const [currentValue, setCurrentValue] = React.useState(defaultValue);
  const [currentOptions, setCurrentOptions] = React.useState(options);
  
  // These useEffects are needed for components that change state frequently but do not unmount, thus these useStates retain the old values.
  // There must be a better way to design this (or the aforemention components) TODO: Look into this
  // Examples: Contacts and Events Info sliding panels - real pain my assholes but with unmounting I won't be able to keep the sliding animations
  React.useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue])
  React.useEffect(() => {
    setCurrentOptions(options);
  }, [options])

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && canAdd) {
      const input = event.target.value;
      if (!currentOptions.includes(input)) {
        const newOption = { label: input, value: input };
        setCurrentOptions([...currentOptions, newOption]);
        setCurrentValue([...currentValue, newOption]);
        onChange([...currentValue, newOption]);
      }
    }
  }

  const handleInput: AutoCompleteHandler = (event, newValue) => {
    setCurrentValue(newValue);
    onChange(newValue);
  }

  return (
    <FormControl className={className}>
      <Autocomplete
        multiple
        value={currentValue}
        options={currentOptions}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, value) => option.label === value.label}
        renderInput={(params) => <TextField {...params} size={size} variant={variant || 'outlined'} label={label} />}
      />
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default TextMultiSelect; 