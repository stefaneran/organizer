import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ContactsGroups from '@contacts/components/ContactsGroups';
import ContactsTableToolbar from '@contacts/components/ContactsTableToolbar';
import ContactsTable from '@contacts/components/ContactsTable';
import ContactPanel from '@contacts/components/ContactPanel';
import ContactsDialogs from '@contacts/components/dialogs';
import DialogTypes from '@contacts/interfaces/DialogTypes.interface';
import getGroupsFromContacts from '@contacts/utils/getGroupsFromContacts';

const useStyles = makeStyles((theme: Theme) => createStyles({
  innerContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}));

const ContactsContainer = ({
  contacts,
  groups,
  updateGroups,
  createContact,
  deleteContact, // TODO - Implement
  editContact,
  addContactInteraction
}) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState('');
  console.log(contacts)

  const [selectedContact, setSelectedContact] = React.useState(undefined);
  const [selectedGroup, setSelectedGroup] = React.useState('All');

  const handleSelectContact = (contactId) => () => setSelectedContact(contactId)
  const handleChangeGroup = (group) => () => setSelectedGroup(group);

  const [nameFilter, setNameFilter] = React.useState('');
  const [locationFilter, setLocationFilter] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState(undefined);
  
  const handleNameChange = (name, value) => setNameFilter(value);
  const handleLocationChange = (name, value) => setLocationFilter(value);
  const handleSort = (order) => setSortOrder(order === sortOrder ? undefined : order);

  const filters = {
    selectedGroup,
    nameFilter,
    locationFilter,
    sortOrder
  }

  React.useEffect(() => {
    updateGroups(getGroupsFromContacts(contacts));
  }, [contacts]);

  const handleOpenDialog = (type: DialogTypes) => () => {
    setOpenDialog(type);
  }

  const handleCloseDialog = ({ isSubmit, ...props }) => {
    if (openDialog === DialogTypes.CreateContact && isSubmit) {
      createContact({ formData: props.formData });
    }
    if (openDialog === DialogTypes.EditGroups && isSubmit) {
      editContact({ 
        id: selectedContact, 
        property: 'groups', 
        value: props.formData 
      });
    }
    setOpenDialog('');
  }

  const handleContactInteraction = (contactId, interactionType) => () => {
    addContactInteraction({ id: contactId, interactionType });
  }

  return (
    <>
      <Grid container item xs={11} spacing={2} className={'gridRow'} style={{ height: '85%' }}>
        <Grid item xs={selectedContact ? 6 : 12} className={classes.innerContainer}>
          <ContactsTableToolbar 
            nameFilter={nameFilter} 
            onNameChange={handleNameChange}
            locationFilter={locationFilter} 
            onLocationChange={handleLocationChange}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenDialog={handleOpenDialog}
          />
          <ContactsGroups 
            groups={groups} 
            selectedGroup={selectedGroup}
            onChangeGroup={handleChangeGroup} 
          />
          <ContactsTable 
            contacts={contacts} 
            filters={filters} 
            selectedContact={selectedContact}
            onInteraction={handleContactInteraction}
            onSelectContact={handleSelectContact}
          />
        </Grid>
        {selectedContact && (
          <Grid item xs={6} className={classes.innerContainer}>
            <ContactPanel 
              contact={contacts[selectedContact]}
              onOpenDialog={handleOpenDialog} 
            />
          </Grid>
        )}
      </Grid>

      <ContactsDialogs
        openDialog={openDialog}
        onCloseDialog={handleCloseDialog}
        selectedContact={selectedContact}
        contacts={contacts} 
        groups={groups}
      />

    </>
  )
}

export default ContactsContainer;