import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { initGroups } from 'contacts/store';
import { getContactsAndEvents } from 'contacts/store/thunks';
import { getActivities } from 'activities/store/thunks';
// Components
import { Paper } from '@material-ui/core';
import ContactsPanel from 'contacts/container/ContactsPanel';
import EventsPanel from 'contacts/container/EventsPanel';
// Utils
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { OrganizerModule, RootState, AppDispatch } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    marginTop: '1em',
    display: 'flex',
    textAlign: 'center',
    overflow: 'hidden'
  }
}));

const ContactsContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.app.user);
  const { lastUpdate, groups, contacts } = useSelector((state: RootState) => state.contactsStore);
  const activitiesLastUpdate = useSelector((state: RootState) => state.activitiesStore.lastUpdate);

  React.useEffect(() => {
    const isContactsDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Contacts, lastUpdate);
    const isActivitiesDataUpToDate = checkStoreDataSyncInLocalStorage(OrganizerModule.Activities, activitiesLastUpdate);
    if (loggedIn) {
      if (!isContactsDataUpToDate) {
        dispatch(getContactsAndEvents());
      }
      if (!isActivitiesDataUpToDate) {
        dispatch(getActivities());
      }
    }
  }, [loggedIn])

  // Initialize contact groups when receving contacts
  React.useEffect(() => {
    if (!groups.length) {
      // This runs on every contact edit/creation so we only run it once here
      dispatch(initGroups());
    }
  }, [contacts])

  return (
    <Paper className={classes.container}>
      <ContactsPanel />
      <EventsPanel />
    </Paper>
  )
}

export default ContactsContainer;