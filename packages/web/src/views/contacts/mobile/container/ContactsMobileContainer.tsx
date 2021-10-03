import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { 
  connector, 
  ReduxProps, 
  DispatchProps 
} from 'contacts/mobile/container/ContactsMobileConnector';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
// Components
import ContactsFilters from 'contacts/mobile/components/ContactsFilters';
import ContactsList from 'contacts/components/ContactsPanel/ContactsList';
// Utils
import defaultContactFilters from 'contacts/utils/defaultContactFilters';
import getContactsArray from 'contacts/utils/getContactsArray';

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

const ContactsMobileContainer: React.FC<ReduxProps & DispatchProps> = ({ 
  contacts, 
  groups,
  ...actions
}) => {
  const classes = useStyles();

  const [selectedContact, setSelectedContact] = React.useState('');
  const [contactsFilters, setContactsFilters] = React.useState(defaultContactFilters);
  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);

  const hasSelectedContact = Boolean(selectedContact.length);

  const contactsList = 
    React.useMemo(() => 
      getContactsArray(contacts, contactsFilters), 
      [contacts, contactsFilters]
    );

  // Initialize contact groups when receving contacts
  React.useEffect(() => {
    if (!groups.length) {
      actions.initGroups();
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
        contactsList={contactsList}
        mobile
        onSelect={handleSelectContact}
        onSnoozeContact={actions.updateLastContact}
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

export default connector(ContactsMobileContainer);