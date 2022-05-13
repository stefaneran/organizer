import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// Components
import { List } from '@material-ui/core';
import ContactsListItem from 'contacts/components/ContactsPanel/ContactsListItem';
// Types
import { Contact } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    height: '92%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  mobile?: boolean;
  contactsList: Contact[];
  onSelect: (contactId?: string) => void;
}

const ContactsList: React.FC<Props> = ({ 
  contactsList, 
  mobile, 
  onSelect
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
        />
      ))}
    </List>
  )
}

export default ContactsList;