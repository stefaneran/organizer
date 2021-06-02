import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Contact } from '@contacts/types.d';

interface Props {
  contact: Contact;
  onOpenInfo: (contactId?: string) => void;
}

const ContactsListItem: React.FC<Props> = ({ contact, onOpenInfo }) => {

  const handleOpenInfoPanel = () => {
    onOpenInfo(contact.id)
  }

  return (
    <ListItem
      button
      onClick={handleOpenInfoPanel}
      style={{ 
        // background: itemBackground(item)
      }}
    >
      <ListItemText>
        {contact.name}
      </ListItemText>
      <div>
        
      </div>
    </ListItem>
  )
}

export default ContactsListItem;