import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { EventFilters } from 'contacts/types';
import { InputEvent } from 'core/types';

const useStyles = makeStyles(() => createStyles({
  input: {
    marginTop: '1em'
  }
}));

interface Props {
  eventsFilters: EventFilters;
  onChangeFilter: (property: string) => (value: string) => void;
}

const ContactsFilters: React.FC<Props> = ({
  eventsFilters,
  onChangeFilter
}) => {
  const classes = useStyles();

  const handleChangeTitleFilter = (event: InputEvent) => {
    onChangeFilter('title')(event.target.value);
  }

  return (
    <>
      <TextField 
        className={classes.input}
        value={eventsFilters.title}
        onChange={handleChangeTitleFilter}
        size="small"
        variant="outlined"
        label="Event Title"
      />
    </>
  )
}

export default ContactsFilters;