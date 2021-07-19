import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ContactsListItem from './ContactsListItem';
import { Contact } from 'contacts/types'

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
}

const ContactsList: React.FC<Props> = ({ contactsList, mobile, onSelect }) => {
  const classes = useStyles();
  
  return (
    <List component="div" className={classes.container}>
      {contactsList && contactsList.map(contact => (
        <ContactsListItem 
          key={contact.id} 
          contact={contact} 
          onSelect={onSelect} 
          mobile={mobile}
        />
      ))}
    </List>
  )
}

export default ContactsList;