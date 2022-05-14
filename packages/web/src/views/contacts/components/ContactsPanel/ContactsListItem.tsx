import * as React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { updateLastContact } from 'contacts/store/thunks';
// Components
import { ListItem, ListItemText } from '@material-ui/core';
import ContactMeter from 'contacts/components/ContactsPanel/ContactMeter';
import GenderChip from 'contacts/components/ContactsPanel/GenderChip';
// Types
import { Contact } from 'contacts/types';
import { AppDispatch } from '@core/types';

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
}

const ContactsListItem: React.FC<Props> = ({ 
  contact, 
  mobile, 
  onSelect
}) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { id, name, location, lastContact, lastHangout, gender } = contact;

  const handleOpenInfoPanel = () => {
    onSelect(id)
  }
  const handleSnooze = (event) => {
    event.stopPropagation();
    dispatch(updateLastContact(id));
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
        </div>
      ) : null}
      <div>
        <ContactMeter 
          lastContact={lastContact} 
          isHangout={false}
          mobile={mobile} 
          onClick={handleSnooze}  
        />
        <ContactMeter 
          lastContact={lastHangout} 
          isHangout
          mobile={mobile} 
        />
      </div>
    </ListItem>
  )
}

export default ContactsListItem;