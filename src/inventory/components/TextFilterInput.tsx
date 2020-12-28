import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const TextFilterInput = ({ value, onChange }) => {
  return (
    <TextField 
      value={value}
      onChange={onChange}
      label="Filter" 
      size="small" 
      variant="standard" 
      fullWidth
    />
  )
}

export default TextFilterInput;