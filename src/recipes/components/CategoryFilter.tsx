import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const CategoryFilter = ({ recipes, categoryOptions, onChange }) => {

  const handleSelect = (e, newValue) => {
    onChange(newValue);
  }

  return (
    <Autocomplete
      style={{ width: '160px', marginRight: '1em' }}
      options={categoryOptions}
      onChange={handleSelect}
      getOptionLabel={(option) => option}
      renderInput={(params) => 
        <TextField 
          {...params}
          label="Category Filter"  
          size="small" 
          variant="outlined" 
        />
      }
    />
  )
}

export default CategoryFilter;

