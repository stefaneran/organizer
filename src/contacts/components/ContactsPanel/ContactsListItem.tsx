import * as React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

const ContactsListItem = ({ contact, onOpenInfo }) => {

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
    </ListItem>
  )
}

export default ContactsListItem;