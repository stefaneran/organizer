import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import ContactsToolBar from '@contacts/components/ContactsPanel/ContactsToolBar';
import ContactsList from '@contacts/components/ContactsPanel/ContactsList';
import ContactInfo from '@contacts/components/ContactsPanel/ContactInfo';
import ContactsFilters from '@contacts/components/ContactsPanel/ContactsFilters';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';
import getContactsArray from '@contacts/utils/getContactsArray';

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

const ContactsPanel = ({ contacts, groups, actions }) => {
  const classes = useStyles();

  const [selectedContact, setSelectedContact] = React.useState('');
  const [contactsFilters, setContactsFilters] = React.useState(defaultFilters);
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
  const [isFiltersPanelOpen, setFiltersPanelOpen] = React.useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const contactsList = React.useMemo(() => getContactsArray(contacts, contactsFilters), [contacts, contactsFilters]);

  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  const handleOpenInfoPanel = (contactId) => {
    setSelectedContact(typeof contactId === 'string' ? contactId : '');
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedContact('');
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
  const handleDeleteContact = () => {
    actions.deleteContact(selectedContact);
    handleCloseInfoPanel();
    toggleConfirmationDialog();
  }

  return (
    <div className={classes.container}>
      <ContactsToolBar 
        onOpenInfo={handleOpenInfoPanel}
        isFiltersOpen={isFiltersPanelOpen}
        onOpenFilters={handleOpenFiltersPanel}
        onCloseFilters={handleCloseFiltersPanel}
        groups={groups}
        onChangeFilter={handleChangeFilter}
      />
      <ContactsList 
        contactsList={contactsList}
        onOpenInfo={handleOpenInfoPanel}
      />

      {/** Sliding Side Panels */}
      <ContactInfo 
        contact={contacts[selectedContact]}
        contactId={selectedContact}
        groups={groups}
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfoPanel}
        actions={actions}
        onDeleteContact={toggleConfirmationDialog}
      />
      <ContactsFilters 
        isOpen={isFiltersPanelOpen}
        onClose={handleCloseFiltersPanel}
        contactsFilters={contactsFilters}
        onChangeFilter={handleChangeFilter}
      />
      {isConfirmationOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={'Confirm To Delete Contact'}
          confirmationText={`Are you sure you want to delete ${selectedContact.length && contacts[selectedContact].name}?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={handleDeleteContact}
        />
      )}
    </div>
  )
}

export default ContactsPanel;