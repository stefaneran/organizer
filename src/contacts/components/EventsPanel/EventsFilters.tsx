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
    transition: 'left 300ms',
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
  eventsFilters: {
    title: string;
  };
  onChangeFilter: (property: string) => (value: string) => void;
}

const ContactsFilters: React.FC<Props> = ({
  isOpen,
  onClose,
  eventsFilters,
  onChangeFilter
}) => {
  const classes = useStyles();

  const handleChangeTitleFilter = (e) => {
    onChangeFilter('title')(e.target.value);
  }

  return (
    <div className={classes.sidepanel} style={{ left: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <TextField 
        className={classes.input}
        value={eventsFilters.title}
        onChange={handleChangeTitleFilter}
        size="small"
        variant="outlined"
        label="Event Title"
      />
    </div>
  )
}

export default ContactsFilters;