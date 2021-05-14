import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ContactInfoEdit from '@contacts/components/ContactsPanel/ContactInfoEdit';
import Chips from '@contacts/components/Chips';
import Contact from '@contacts/interfaces/Contact.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0',
    padding: '1em'
  },
  topButtons: {
    textAlign: 'right'
  },
  infoGroup: {
    textAlign: 'left'
  }
}));

interface Props {
  contact: Contact;
  contactId: string;
  groups: string[];
  isOpen: boolean;
  onClose: ()=>void;
  actions;
  onDeleteContact: () => void;
}

const ContactInfo = ({ 
  contact,
  contactId,
  groups,
  isOpen,
  onClose,
  actions,
  onDeleteContact
 }: Props) => {
  const classes = useStyles();
  const isCreate = !Boolean(contactId);

  const [isEdit, setIsEdit] = React.useState(isCreate);

  React.useEffect(() => {
    if (isCreate) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [contactId])

  const toggleEdit = () => setIsEdit(!isEdit);
  const handleClose = () => onClose();

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      {isOpen ? (
        <>
          <div className={classes.topButtons}>
            {!isCreate ? (
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            ) : null}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {isEdit ? (
            <ContactInfoEdit 
              contact={contact}
              contactId={contactId}
              groups={groups}
              onClose={handleClose}
              toggleEdit={toggleEdit}
              createContact={actions.createContact}
              editContact={actions.editContact}
              onDeleteContact={onDeleteContact}
            />
          ) : (
            <div className={classes.infoGroup}>
              <Typography variant="h4">{contact?.name}</Typography>
              <Typography variant="h5">{contact?.location}</Typography>
              <Chips 
                memo={() => contact?.groups ?? []}
                deps={[contact?.groups]}
                getKey={(group) => group}
                getLabel={(group) => group}
              />
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

export default ContactInfo;