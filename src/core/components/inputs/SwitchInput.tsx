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
  onChange: () => void;
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
  return (
    <div className={className ? clsx(classes.switchContainer, className) : classes.switchContainer}>
      {uncheckedIcon ? uncheckedIcon : null}
      <Switch 
        checked={isChecked} 
        onChange={onChange} 
        color="primary" 
        disabled={disabled}
      />
      {checkedIcon ? checkedIcon : null}
    </div>
  )
}

export default SwitchInput;
