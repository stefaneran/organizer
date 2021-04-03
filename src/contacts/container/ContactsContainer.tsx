import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ContactsPanel from '@contacts/components/ContactsPanel';
import EventsPanel from '@contacts/components/EventsPanel';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center',
    overflow: 'hidden'
  }
}));

const ContactsContainer = ({ contacts, createContact, editContact, deleteContact }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <ContactsPanel 
        contacts={contacts} 
        createContact={createContact}
        editContact={editContact}
        deleteContact={deleteContact}
      />
      <EventsPanel />
    </Paper>
  )
}

export default ContactsContainer;