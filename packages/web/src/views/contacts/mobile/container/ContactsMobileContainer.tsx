import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Thunks/Actions
import { initGroups } from 'contacts/store';
import { getContactsAndEvents } from 'contacts/store/thunks';
import { getActivities } from 'activities/store/thunks';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
// Components
import { Typography } from '@material-ui/core';
import ContactsFilters from 'contacts/mobile/components/ContactsFilters';
import ContactsList from 'contacts/components/ContactsPanel/ContactsList';
// Utils
import defaultContactFilters from 'contacts/utils/defaultContactFilters';
import getContactsArray from 'contacts/utils/getContactsArray';
import { checkStoreDataSyncInLocalStorage } from '@core/localstorage/lastUpdate';
// Types
import { OrganizerModule, RootState, AppDispatch } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#fff',
    padding: '1.5em',
    position: 'relative'
  },
  header: {
    textAlign: 'center'
  },
  navRight: {
    position: 'absolute',
    right: '3em'
  },
  arrowIcon: {
    width: '4em', 
    height: '4em', 
    position: 'relative', 
    top: '2em', 
    color: '#3f51b5'
  },
  filtersDrawer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    transition: 'right 300ms'
  },
  filtersContent: {
    height: '100%',
    width: '75%',
    background: '#ecedf0',
    padding: '10em 6em'
  },
  filtersExit: {
    height: '100%',
    width: '25%'
  }
}));

const ContactsMobileContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedIn } = useSelector((state: RootState) => state.app.user);
  const { lastUpdate, contacts, groups } = useSelector((state: RootState) => state.contactsStore);
  const activitiesLastUpdate = useSelector((state: RootState) => state.activitiesStore.lastUpdate);

  const [selectedContact, setSelectedContact] = React.useState('');
  const [contactsFilters, setContactsFilters] = React.useState(defaultContactFilters);
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const hasSelectedContact = Boolean(selectedContact.length);

  const contactsList = 
    React.useMemo(() => 
      getContactsArray(contacts, contactsFilters), 
      [contacts, contactsFilters]
    );

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
      dispatch(initGroups());
    }
  }, [contacts])

  const toggleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen);
  }
  const handleSelectContact = (id?: string) => () => {
    if (selectedContact !== id) {
      setSelectedContact(id);
    } else {
      setSelectedContact('');
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
    setContactsFilters({
      ...contactsFilters,
      [property]: value
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h1">
          Contacts
        </Typography>
        <div 
          className={classes.navRight} 
          style={{ top: hasSelectedContact ? '-1em' : '2em' }}
          onClick={hasSelectedContact ? handleSelectContact(selectedContact) : toggleFilterMenuOpen}
        >
          {hasSelectedContact ? (
            <>
              <ChevronLeftIcon className={classes.arrowIcon} />
              {/* <FoodIconLarge /> */}
            </>
          ) : (
            <FilterListIconLarge />
          )}
        </div>
      </div>
      <br/>
      <ContactsList 
        mobile
        contactsList={contactsList}
        onSelect={handleSelectContact}
      />
      <div 
        className={classes.filtersDrawer}
        style={{ right: filterMenuOpen ? '0%' : '-100%' }}
      >
        <div className={classes.filtersExit} onClick={toggleFilterMenuOpen} />
        <div className={classes.filtersContent}>
          <ContactsFilters 
            contactsFilters={contactsFilters}
            toggleFilterMenuOpen={toggleFilterMenuOpen}
            onChangeFilter={handleChangeFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactsMobileContainer;