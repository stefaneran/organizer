import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import ContactMeter from 'contacts/components/ContactsPanel/ContactMeter';
import GenderChip from 'contacts/components/ContactsPanel/GenderChip';
import RelationshipChip from 'contacts/components/ContactsPanel/RelationshipChip';
import { Contact } from 'contacts/types';
import { ReduxProps } from 'contacts/container/ContactsConnector';

const useStyles = makeStyles(() => createStyles({
  miniChips: {
    display: 'flex'
  },
  mobileContainer: {
    fontSize: '3em',
    '& span': { fontSize: '4rem '},
    '& p': { fontSize: '3rem' }
  }
}));

interface Props {
  contact: Contact;
  mobile?: boolean;
  onSelect: (contactId?: string) => void;
  onSnoozeContact: ReduxProps["updateLastContact"];
}

const ContactsListItem: React.FC<Props> = ({ 
  contact, 
  mobile, 
  onSelect, 
  onSnoozeContact 
}) => {
  const classes = useStyles();
  const { id, name, location, lastContact, gender, relationshipStatus } = contact;

  const handleOpenInfoPanel = () => {
    onSelect(id)
  }
  const handleSnooze = (event) => {
    event.stopPropagation();
    onSnoozeContact(id);
  }

  return (
    <ListItem
      button
      onClick={handleOpenInfoPanel}
      className={mobile ? classes.mobileContainer : ''}
    >
      <ListItemText primary={name} secondary={location} />
      {!mobile ? (
        <div className={classes.miniChips}>
          <GenderChip gender={gender} mini />
          <RelationshipChip relationshipStatus={relationshipStatus} mini />
        </div>
      ) : null}
      <ContactMeter 
        lastContact={lastContact} 
        mobile={mobile} 
        onClick={handleSnooze}  
      />
    </ListItem>
  )
}

export default ContactsListItem;