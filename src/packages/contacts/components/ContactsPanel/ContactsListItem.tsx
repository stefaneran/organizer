import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import ContactMeter from 'contacts/components/ContactsPanel/ContactMeter';
import GenderChip from 'contacts/components/ContactsPanel/GenderChip';
import RelationshipChip from 'contacts/components/ContactsPanel/RelationshipChip';
import { Contact } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
  miniChips: {
    display: 'flex'
  }
}));

interface Props {
  contact: Contact;
  onOpenInfo: (contactId?: string) => void;
}

const ContactsListItem: React.FC<Props> = ({ contact, onOpenInfo }) => {
  const classes = useStyles();
  const { id, name, location, lastContact, gender, relationshipStatus } = contact;

  const handleOpenInfoPanel = () => {
    onOpenInfo(id)
  }

  return (
    <ListItem
      button
      onClick={handleOpenInfoPanel}
    >
      <ListItemText primary={name} secondary={location} />
      <div className={classes.miniChips}>
        <GenderChip gender={gender} mini />
        <RelationshipChip relationshipStatus={relationshipStatus} mini />
      </div>
      <ContactMeter lastContact={lastContact}  />
    </ListItem>
  )
}

export default ContactsListItem;