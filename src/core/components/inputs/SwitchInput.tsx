import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  switchContainer: {
    display: 'flex'
  }
}));

interface Props {
  isChecked: boolean;
  onChange: (isChecked) => void;
  disabled?: boolean;
  className?: string;
  uncheckedIcon?; // Icon on the left side
  checkedIcon?;   // Icon on the right side
}

const SwitchInput = ({ 
  isChecked, 
  onChange, 
  disabled,
  className, 
  uncheckedIcon, 
  checkedIcon 
}: Props) => {
  const classes = useStyles();
  const handleCheck = (event) => {
    const isChecked = event.target.checked;
    onChange(isChecked)
  }
  return (
    <div className={className ? clsx(classes.switchContainer, className) : classes.switchContainer}>
      {uncheckedIcon ? uncheckedIcon : null}
      <Switch 
        checked={isChecked} 
        onChange={handleCheck} 
        color="primary" 
        disabled={disabled}
      />
      {checkedIcon ? checkedIcon : null}
    </div>
  )
}

export default SwitchInput;