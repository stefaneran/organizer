import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import ContactMeter from '@contacts/components/ContactsPanel/ContactMeter';
import { Contact } from '@contacts/types';

interface Props {
  contact: Contact;
  onOpenInfo: (contactId?: string) => void;
}

const ContactsListItem: React.FC<Props> = ({ contact, onOpenInfo }) => {

  const { id, name, location, lastContact } = contact;

  const handleOpenInfoPanel = () => {
    onOpenInfo(id)
  }

  return (
    <ListItem
      button
      onClick={handleOpenInfoPanel}
      style={{ 
        // background: itemBackground(item)
      }}
    >
      <ListItemText primary={name} secondary={location} />
      <ContactMeter lastContact={lastContact}  />
    </ListItem>
  )
}

export default ContactsListItem;