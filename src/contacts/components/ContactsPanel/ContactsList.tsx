import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ContactsListItem from './ContactsListItem';
import genericSort from '@core/utils/genericSort';

const useStyles = makeStyles((theme: Theme) => createStyles({
  
}));

const ContactsList = ({ contactsList, onOpenInfo }) => {
  const classes = useStyles();
  
  return (
    <List component="div">
      {contactsList && contactsList.sort((a, b) => genericSort(a.name, b.name)).map(contact => (
        <ContactsListItem key={contact.id} contact={contact} onOpenInfo={onOpenInfo} />
      ))}
    </List>
  )
}

export default ContactsList;