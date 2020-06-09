import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ContentToolbar, { exportedStyles } from '@components/ContentToolbar';
import ContactsView from '@components/ContactsView';
import CreateContactDialog from '@components/Dialogs/CreateContactDialog';
import EditContactSubgroups from '@components/Dialogs/EditContactSubgroups';

const { useState, useEffect } = React;

const useStyles = makeStyles((theme: Theme) => createStyles(exportedStyles));

const ContactsContainer = ({ store, toolBarHandlers }) => {
  const classes = useStyles();
  const { data: { contacts } } = store;

  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState('All');

  const [createContactDialogOpen, setCreateContactDialogOpen] = useState(false);
  const [editSubgroupsDialogOpen, setEditSubgroupsDialogOpen] = useState(false);

  const globalDialogActions = {
    open: (type) => () => {
      const map = {
        editSubgroups: () => setEditSubgroupsDialogOpen(true)
      }
      map[type]();
    }
  }

  // Update contact state when store changes
  useEffect(() => {
    if(selectedContact) {
      const contactData = contacts.find(contact => contact.name === selectedContact.name)
      setSelectedContact(contactData);
    }
  }, [store]);

  const handleSelectContact = (contact) => () => setSelectedContact(contact)
  const handleChangeSubgroup = (subgroup) => () => setSelectedSubgroup(subgroup);

  const handleContactInteraction = (contactName, interactionType) => () => {
    const { logContactInteraction, saveData } = store;
    logContactInteraction({ contactName, interactionType });
    saveData();
  }

  const handleCloseCreateContactDialog = ({ isSubmit, formData }) => {
    if (isSubmit) {
      const { addContact, saveData } = store;
      addContact({ formData });
      saveData();
    }
    setCreateContactDialogOpen(false);
  }

  const handleCloseEditSubgroupsDialog = ({ isSubmit, newSubgroups }) => {
    if (isSubmit) {
      const { editContactSubgroup, saveData } = store;
      editContactSubgroup({ selectedContact, newSubgroups });
      saveData();
    }
    setEditSubgroupsDialogOpen(false);
  } 

  return (
    <>
      <Grid item xs={1} className={'gridRow'}>
        <ContentToolbar 
          store={store} 
          toolBarHandlers={toolBarHandlers} 
          specializedButtons={(
            <>
              <Grid item className={classes.buttonContainer}>
                <Button 
                  className={clsx(classes.button, classes.textButton)} 
                  onClick={() => setCreateContactDialogOpen(true)}
                  endIcon={<AddIcon className={classes.buttonIcon} />}
                >
                  Add Contact
                </Button>
              </Grid>
            </>
          )} 
        />
      </Grid>
      <Grid item xs={11} className={'gridRow'} style={{ height: '85%' }}>
        <ContactsView 
          store={store} 
          selectedContact={selectedContact}
          selectedSubgroup={selectedSubgroup}
          onSelectContact={handleSelectContact}
          onChangeSubgroup={handleChangeSubgroup}
          onInteraction={handleContactInteraction} 
          globalDialogActions={globalDialogActions}
        />
      </Grid>

      {/* Dialogs and Pop-Ups below this line  */}

      {createContactDialogOpen && (
        <CreateContactDialog
          isOpen={createContactDialogOpen} 
          onClose={handleCloseCreateContactDialog}
          contacts={contacts}
        />
      )}

      {editSubgroupsDialogOpen && (
        <EditContactSubgroups
          isOpen={editSubgroupsDialogOpen}
          subgroups={selectedContact.subgroups}
          onClose={handleCloseEditSubgroupsDialog}
        />
      )}

    </>
  )
}

export default ContactsContainer;