import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';
import EditButtonGroup from '@contacts/components/EditButtonGroup';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import Contact from '@contacts/interfaces/Contact.interface';
import defaultContactProps from '@contacts/utils/defaultContactProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  inputsGroup: {
    textAlign: 'left'
  },
  input: {
    marginBottom: '1em'
  },
  groupsAutocomplete: {
    width: '100%'
  }
}));

interface Props {
  contact: Contact;
  contactId: string;
  groups: string[];
  onClose: () => void;
  toggleEdit: () => void;
  onDeleteContact: () => void;
  createContact: Function;
  editContact: Function;
}

const ContactInfo = ({ 
  contact,
  contactId,
  groups,
  onClose,
  toggleEdit,
  onDeleteContact,
  createContact,
  editContact
 }: Props) => {
  const classes = useStyles();
  const isCreate = !Boolean(contactId);

  const [contactData, setContactData] = React.useState(isCreate ? defaultContactProps : contact);

  React.useEffect(() => {
    if (isCreate) {
      setContactData(defaultContactProps);
    } else {
      setContactData(contact);
    }
  }, [contactId])

  const handleChangeContactData = (property) => (eventOrValue) => {
    let value = eventOrValue.target?.value ?? eventOrValue;
    if (property === 'groups') {
      value = value.map(v => v.value);
    }
    setContactData({
      ...contactData,
      [property]: value
    })
  }
  const handleSubmit = async () => {
    if (isCreate) {
      await createContact(contactData);
      onClose();
    } else {
      await editContact(contactId, contactData)
      toggleEdit();
    }
  }

  return (
    <>

      <div className={classes.inputsGroup}>
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
        <TextField
          value={contactData.location}
          onChange={handleChangeContactData('location')}
          className={classes.input}
          variant="outlined"
          size="small"
          placeholder="Location"
          fullWidth
        />
        <TextMultiSelect
          className={classes.groupsAutocomplete}
          label="Groups"
          onChange={handleChangeContactData('groups')}
          defaultValue={contactData.groups.map(group => ({ label: group, value: group }))}
          options={groups.map(group => ({ label: group, value: group }))}
          canAdd
          helperText="Groups this contact belongs to. Hint: Press enter to add new non-existant group."
          size="medium"
        />
      </div>

      <EditButtonGroup 
        isCreate={isCreate}
        onSubmit={handleSubmit}
        onDelete={onDeleteContact}
        onClose={onClose}
      />

    </>
  )
}

export default ContactInfo;