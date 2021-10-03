import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ContactsListItem from './ContactsListItem';
import { Contact } from 'contacts/types';
import { ReduxProps } from 'contacts/container/ContactsConnector';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '92%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  contactsList: Contact[];
  mobile?: boolean;
  onSelect: (contactId?: string) => void;
  onSnoozeContact: ReduxProps["updateLastContact"];
}

const ContactsList: React.FC<Props> = ({ 
  contactsList, 
  mobile, 
  onSelect, 
  onSnoozeContact 
}) => {
  const classes = useStyles();
  return (
    <List component="div" className={classes.container}>
      {contactsList && contactsList.map(contact => (
        <ContactsListItem 
          key={contact.id} 
          contact={contact} 
          mobile={mobile}
          onSelect={onSelect} 
          onSnoozeContact={onSnoozeContact}
        />
      ))}
    </List>
  )
}

export default ContactsList;