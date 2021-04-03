import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ContactsToolBar from './ContactsToolBar';
import ContactsList from './ContactsList';
import ContactInfoSidePanel from './ContactInfoSidePanel';
import ContactsFiltersSidePanel from './ContactsFiltersSidePanel';
import getAllGroups from '@contacts/utils/getAllGroups';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '50%',
    position: 'relative',
    padding: '1em',
    overflow: 'hidden'
  }
}));

const defaultFilters = {
  group: 'All',
  name: '',
  location: ''
}

const ContactsPanel = ({ contacts, createContact, editContact, deleteContact }) => {
  const classes = useStyles();

  const [selectedContact, setSelectedContact] = React.useState(null);
  const [contactsFilters, setContactsFilters] = React.useState(defaultFilters);
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
  const [isFiltersPanelOpen, setFiltersPanelOpen] = React.useState(false);

  const allGroups = React.useMemo(() => getAllGroups(contacts), [contacts])

  const handleOpenInfoPanel = (contactId) => {
    setSelectedContact(typeof contactId === 'string' ? contactId : undefined);
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedContact(null);
    setInfoPanelOpen(false);
  }
  const handleOpenFiltersPanel = () => {
    setFiltersPanelOpen(true);
  }
  const handleCloseFiltersPanel = () => {
    setFiltersPanelOpen(false);
  }

  const handleChangeFilter = (property) => (value) => {
    setContactsFilters({
      ...contactsFilters,
      [property]: value
    });
  }

  return (
    <div className={classes.container}>
      <ContactsToolBar 
        onOpenInfo={handleOpenInfoPanel}
        isFiltersOpen={isFiltersPanelOpen}
        onOpenFilters={handleOpenFiltersPanel}
        onCloseFilters={handleCloseFiltersPanel}
        allGroups={allGroups}
        onChangeFilter={handleChangeFilter}
      />
      <ContactsList 
        contacts={contacts} 
        contactsFilters={contactsFilters}
        onOpenInfo={handleOpenInfoPanel}
      />

      {/** Side Panels (Left and Right respectively) */}
      <ContactInfoSidePanel 
        contact={contacts[selectedContact]}
        contactId={selectedContact}
        allGroups={allGroups}
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfoPanel}
        createContact={createContact}
        editContact={editContact}
        deleteContact={deleteContact}
      />
      <ContactsFiltersSidePanel 
        isOpen={isFiltersPanelOpen}
        onClose={handleCloseFiltersPanel}
      />
    </div>
  )
}

export default ContactsPanel;