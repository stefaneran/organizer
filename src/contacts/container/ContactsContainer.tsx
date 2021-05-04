import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ContactsPanel from '@contacts/container/ContactsPanel';
import EventsPanel from '@contacts/container//EventsPanel';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center',
    overflow: 'hidden'
  }
}));

const ContactsContainer = ({ 
  contacts, 
  groups, 
  events, 
  activities,
  ...actions
}) => {
  const classes = useStyles();

  // Initialize contact groups when receving contacts
  React.useEffect(() => {
    if (!groups.length) {
      actions.initGroups();
    }
  }, [contacts])

  return (
    <Paper className={classes.container}>
      <ContactsPanel 
        contacts={contacts} 
        groups={groups}
        actions={actions}
      />
      <EventsPanel 
        events={events}
        contacts={contacts} 
        activities={activities}
        actions={actions}
      />
    </Paper>
  )
}

export default ContactsContainer;