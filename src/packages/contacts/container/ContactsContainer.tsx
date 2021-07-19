import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { connector, ReduxProps, DispatchProps } from 'contacts/container/ContactsConnector';
import ContactsPanel from 'contacts/container/ContactsPanel';
import EventsPanel from 'contacts/container//EventsPanel';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center',
    overflow: 'hidden'
  }
}));

const ContactsContainer: React.FC<ReduxProps & DispatchProps> = ({ 
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

export default connector(ContactsContainer);