import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ContactsListItem from './ContactsListItem';
import getContactsArray from '@contacts/utils/getContactsArray';
import genericSort from '@core/utils/genericSort';

const useStyles = makeStyles((theme: Theme) => createStyles({
  
}));

const ContactsList = ({ contacts, contactsFilters, onOpenInfo }) => {
  const classes = useStyles();
  const contactsList = React.useMemo(() => getContactsArray(contacts, contactsFilters), [contacts, contactsFilters]);
  
  return (
    <List component="div">
      {contactsList && contactsList.sort((a, b) => genericSort(a.name, b.name)).map(contact => (
        <ContactsListItem key={contact.id} contact={contact} onOpenInfo={onOpenInfo} />
      ))}
    </List>
  )
}

export default ContactsList;