import * as React from 'react';
import CreateContactDialog from '@contacts/components/dialogs/CreateContactDialog';
import EditContactGroups from '@contacts/components/dialogs/EditContactGroups';
import DialogTypes from '@contacts/interfaces/DialogTypes.interface';

const ContactsDialogs = ({ 
  openDialog, 
  onCloseDialog,
  selectedContact, 
  contacts, 
  groups
}) => {
  return (
    <>
      {openDialog === DialogTypes.CreateContact && (
        <CreateContactDialog
          isOpen
          onClose={onCloseDialog}
          contacts={contacts}
          groups={groups}
        />
      )}

      {openDialog === DialogTypes.EditGroups && (
        <EditContactGroups
          isOpen
          onClose={onCloseDialog}
          groups={groups}
          contactGroups={contacts[selectedContact].groups}
        />
      )}
    </>
  )
}

export default ContactsDialogs;