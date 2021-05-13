import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, IconButton, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import ContactInfoGroups from './ContactInfoGroups';
import ContactInfoGroupsEdit from './ContactInfoGroupsEdit';
import Contact from '@contacts/interfaces/Contact.interface';
import defaultContactProps from '@contacts/utils/defaultContactProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0'
  },
  topButtons: {
    textAlign: 'right'
  },
  textValues: {
    padding: '0 1em 0 1em',
    textAlign: 'left'
  },
  input: {
    marginBottom: '1em'
  },
  buttonContainer: {
    marginTop: '1em',
    textAlign: 'center'
  },
  button: {
    marginRight: '1em'
  }
}));

interface Props {
  contact: Contact;
  contactId: string;
  groups: string[];
  isOpen: boolean;
  onClose: ()=>void;
  createContact: Function;
  editContact: Function;
  onDeleteContact: () => void;
}

const ContactInfo = ({ 
  contact,
  contactId,
  groups,
  isOpen,
  onClose,
  createContact,
  editContact,
  onDeleteContact
 }: Props) => {
  const classes = useStyles();
  const isCreate = !Boolean(contactId);

  const [isEdit, setIsEdit] = React.useState(isCreate);
  const [contactData, setContactData] = React.useState(defaultContactProps);

  React.useEffect(() => {
    if (isCreate) {
      setContactData(defaultContactProps);
      setIsEdit(true);
    } else {
      setContactData({ ...contact });
      setIsEdit(false);
    }
  }, [contactId])

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  }
  const handleChangeContactData = (property) => (eventOrValue) => {
    setContactData({
      ...contactData,
      [property]: property === 'groups' ? eventOrValue : eventOrValue.target.value
    })
  }
  const handleClose = () => {
    onClose();
  }
  const handleSubmit = () => {
    if (isCreate) {
      createContact(contactData);
    } else {
      editContact(contactId, contactData)
    }
    handleClose();
  }

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
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
      <div className={classes.textValues}>
        
        {isEdit ? (
          <>
            <Typography variant="h4" style={{ marginBottom: '0.5em' }}>
              {isCreate ? 'Add New Contact' : `Edit ${contactData.name}'s Details`}
            </Typography>
            <TextField
              value={contactData.name}
              onChange={handleChangeContactData('name')}
              className={classes.input}
              variant="outlined"
              size="small"
              placeholder="Name"
              fullWidth
            />
          </>
        ) : (
          <Typography variant="h4">{contact?.name}</Typography>
        )}
        {isEdit ? (
          <TextField
            value={contactData.location}
            onChange={handleChangeContactData('location')}
            className={classes.input}
            variant="outlined"
            size="small"
            placeholder="Location"
            fullWidth
          />
        ) : (
          <Typography variant="h5">{contact?.location}</Typography>
        )}
      </div>
      {isEdit ? (
        <ContactInfoGroupsEdit
          contactGroups={contactData.groups} 
          groups={groups}
          onChange={handleChangeContactData}
        />
      ) : (
        <ContactInfoGroups contactGroups={contactData.groups} />
      )}
      
      {isEdit ? (
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="outlined" 
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
          {!isCreate ? (
            <Button
              className={classes.button}
              variant="outlined" 
              color="secondary"
              onClick={onDeleteContact}
              endIcon={<TrashIconXS />}
            >
              Delete
            </Button>
          ) : null}
          <Button
            variant="outlined" 
            color="secondary"
            onClick={handleClose}
            endIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default ContactInfo;