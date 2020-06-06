import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Slider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '1em',
    '& label': {
      top: '1em'
    }
  }
}));

interface SliderProps {
  name: string; 
  handleChange; 
  label: string;
  min: number;
  max: number;
  step: number;
  style?;
}

const SliderInput = ({ style, name, handleChange, label, min, max, step }: SliderProps) => {

  const classes = useStyles();

  const handleInput = (event, newValue) => {
    handleChange(name, newValue);
  }

  return (
    <FormControl className={clsx(classes.container, 'fullWidth')} style={style}>
      <InputLabel>{label}</InputLabel>
      <Slider
        min={min}
        max={max}
        step={step}
        defaultValue={0}
        valueLabelDisplay="auto"
        onChange={handleInput}
      />
    </FormControl>
  )
}

export default SliderInput;