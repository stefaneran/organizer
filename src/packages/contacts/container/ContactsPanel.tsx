import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import ContactsToolBar from 'contacts/components/ContactsPanel/ContactsToolBar';
import ContactsList from 'contacts/components/ContactsPanel/ContactsList';
import ContactInfo from 'contacts/components/ContactsPanel/ContactInfo';
import ContactsFilters from 'contacts/components/ContactsPanel/ContactsFilters';
import ConfirmationDialog from '@core/components/ConfirmationDialog';
import SlidingPanel from '@core/components/SlidingPanel';
import defaultContactFilters from 'contacts/utils/defaultContactFilters';
import getContactsArray from 'contacts/utils/getContactsArray';
import { Contact } from 'contacts/types';
import { DispatchProps } from 'contacts/container/ContactsConnector';

const useStyles = makeStyles(() => createStyles({
  container: {
    width: '50%',
    position: 'relative',
    padding: '1em',
    overflow: 'hidden'
  }
}));

interface Props {
  contacts: Record<string, Contact>;
  groups: string[];
  actions: DispatchProps;
}

const ContactsPanel: React.FC<Props> = ({ contacts, groups, actions }) => {
  const classes = useStyles();

  const [selectedContact, setSelectedContact] = React.useState('');
  const [contactsFilters, setContactsFilters] = React.useState(defaultContactFilters);
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
  const [isFiltersPanelOpen, setFiltersPanelOpen] = React.useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const contactsList = 
    React.useMemo(() => 
      getContactsArray(contacts, contactsFilters), 
      [contacts, contactsFilters]
    );

  const toggleFilterPanel = () => {
    setFiltersPanelOpen(!isFiltersPanelOpen);
  }
  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  const handleOpenInfoPanel = (contactId?: string) => {
    setSelectedContact(typeof contactId === 'string' ? contactId : '');
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedContact('');
    setInfoPanelOpen(false);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
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
  const handleSnoozeContact = () => {
    actions.updateLastContact(selectedContact);
  }

  return (
    <div className={classes.container}>
      <ContactsToolBar 
        onOpenInfo={handleOpenInfoPanel}
        toggleFilterPanel={toggleFilterPanel}
        groups={groups}
        contactsFilters={contactsFilters}
        onChangeFilter={handleChangeFilter}
      />
      <ContactsList 
        contactsList={contactsList}
        onSelect={handleOpenInfoPanel}
      />
      {/** Sliding Side Panels */}
      <ContactInfo 
        contact={contacts[selectedContact]}
        contactId={selectedContact}
        groups={groups}
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfoPanel}
        onSnoozeContact={handleSnoozeContact}
        onDeleteContact={toggleConfirmationDialog}
        createContact={actions.createContact}
        editContact={actions.editContact}
      />
      <SlidingPanel
        isOpen={isFiltersPanelOpen}
        onClose={toggleFilterPanel}
        direction={'right'}
        width={50}
      >
        <ContactsFilters
          contactsFilters={contactsFilters}
          onChangeFilter={handleChangeFilter}
        />
      </SlidingPanel>
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