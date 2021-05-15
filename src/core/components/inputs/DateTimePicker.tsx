import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  datepicker: {
    width: '100%',
    marginRight: '0.5em'
  },
  timepicker: {
    width: '100%',
  }
}))

interface Props {
  value: Date;
  onChange: (value: Date) => void;
  label: string;
  className?: string;
}

const DateTimePickerComponent = ({ 
  value = new Date(),
  onChange,
  label,
  className
}: Props) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={clsx(classes.container, className)}>
        <KeyboardDatePicker
          className={classes.datepicker}
          margin="normal"
          label={`${label} Date`}
          format="MM/dd/yyyy"
          value={value}
          onChange={onChange}
          inputVariant="outlined"
        />
        <KeyboardTimePicker
          className={classes.timepicker}
          margin="normal"
          label={`${label} Time`}
          value={value}
          onChange={onChange}
          inputVariant="outlined"
        />
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default DateTimePickerComponent;