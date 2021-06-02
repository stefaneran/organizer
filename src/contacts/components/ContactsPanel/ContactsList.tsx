import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ContactsListItem from './ContactsListItem';
import genericSort from '@core/utils/genericSort';
import { Contact } from '@contacts/types.d'

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '92%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

interface Props {
  contactsList: Contact[];
  onOpenInfo: (contactId?: string) => void;
}

const ContactsList: React.FC<Props> = ({ contactsList, onOpenInfo }) => {
  const classes = useStyles();
  
  return (
    <List component="div" className={classes.container}>
      {contactsList && contactsList.sort((a, b) => genericSort(a.name, b.name)).map(contact => (
        <ContactsListItem key={contact.id} contact={contact} onOpenInfo={onOpenInfo} />
      ))}
    </List>
  )
}

export default ContactsList;