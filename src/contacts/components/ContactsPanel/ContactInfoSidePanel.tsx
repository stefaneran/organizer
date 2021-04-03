import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, IconButton, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import ContactInfoGroupsChips from './ContactInfoGroupsChips';
import { Contact, defaultProps } from '@contacts/interfaces/Contact.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '70%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'left 300ms',
    background: '#ecedf0'
  },
  topButtons: {
    textAlign: 'right'
  },
  textValues: {
    padding: '0 1em 1em 1em',
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
  allGroups: string[];
  isOpen: boolean;
  onClose: ()=>void;
  createContact: Function;
  editContact: Function;
  deleteContact: Function;
}

const ContactInfoSidePanel = ({ 
  contact,
  contactId,
  allGroups,
  isOpen,
  onClose,
  createContact,
  editContact,
  deleteContact
 }: Props) => {
  const classes = useStyles();
  const isCreate = Boolean(!contactId);

  const [isEdit, setIsEdit] = React.useState(false);
  const [contactData, setContactData] = React.useState(defaultProps)

  React.useEffect(() => {
    if (isCreate) {
      setContactData(defaultProps);
      setIsEdit(true);
    } else {
      setContactData({ ...contact });
      setIsEdit(false);
    }
  }, [contactId])

  const toggleEdit = () => setIsEdit(!isEdit);

  const handleChangeContactData = (property) => (eventOrValue) => {
    if (property === 'groups') {
      setContactData({
        ...contactData,
        groups: eventOrValue
      })
    } else {
      setContactData({
        ...contactData,
        [property]: eventOrValue.target.value
      })
    }
  }

  const handleClose = () => {
    setIsEdit(false);
    onClose();
  }

  const handleDelete = () => {
    deleteContact(contactId);
    handleClose();
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
    <div className={classes.sidepanel} style={{ left: isOpen ? '0%' : '-100%' }}>
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
          <TextField
            value={contactData.name}
            onChange={handleChangeContactData('name')}
            className={classes.input}
            variant="outlined"
            size="small"
            placeholder="Name"
            fullWidth
          />
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
      <ContactInfoGroupsChips 
        contactGroups={contact?.groups} 
        allGroups={allGroups}
        isEdit={isEdit} 
        onChange={handleChangeContactData}
      />
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
              onClick={handleDelete}
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

export default ContactInfoSidePanel;