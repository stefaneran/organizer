import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0'
  },
  topButtons: {
    textAlign: 'right'
  },
  input: {
    marginTop: '1em'
  }
}));

interface Props {
  isOpen: boolean;
  onClose: ()=>void;
  contactsFilters: {
    group: string;
    name: string;
    location: string;
  };
  onChangeFilter: (property: string) => (value: string) => void;
}

const ContactsFilters = ({
  isOpen,
  onClose,
  contactsFilters,
  onChangeFilter
 }: Props) => {
  const classes = useStyles();

  const handleChangeNameFilter = (e) => {
    onChangeFilter('name')(e.target.value);
  }
  const handleChangeLocationFilter = (e) => {
    onChangeFilter('location')(e.target.value);
  }

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <TextField 
        className={classes.input}
        value={contactsFilters.name}
        onChange={handleChangeNameFilter}
        size="small"
        variant="outlined"
        label="Name"
      />
      <TextField
        className={classes.input} 
        value={contactsFilters.location}
        onChange={handleChangeLocationFilter}
        size="small"
        variant="outlined"
        label="Location"
      />
    </div>
  )
}

export default ContactsFilters;