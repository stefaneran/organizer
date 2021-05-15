import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import EditButtonGroup from '@contacts/components/EditButtonGroup';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import SelectInput from '@core/components/inputs/SelectInput';
import SwitchInput from '@core/components/inputs/SwitchInput';
import Contact from '@contacts/interfaces/Contact.interface';
import Gender from '@contacts/interfaces/Genders.enum';
import RelationshipStatus from '@contacts/interfaces/RelationshipStatus.enum';
import defaultContactProps from '@contacts/utils/defaultContactProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  headline: {
    position: 'absolute',
    top: '0.5em',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  inputGroup: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputGroupItemOne: {
    width: '100%',
    marginRight: '0.5em'
  },
  inputGroupItemTwo: {
    width: '100%'
  },
  input: {
    marginTop: '1em',
    width: '100%'
  },
  switchContainer: {
    display: 'flex',
    marginTop: '1em',
    '& > h5': {
      paddingTop: '0.1em',
      marginRight: '1em'
    }
  },
  onOneOneSwitch: {
    '& > svg': {
      position: 'relative',
      top: '5px'
    }
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

      <Typography variant="h4" className={classes.headline}>
        {isCreate ? 'Create New Contact' : `Edit ${contactData.name?.split(' ')[0] ?? 'Contact'}'s Details`}
      </Typography>

      <div className={classes.inputGroup}>
        <TextField
          className={classes.inputGroupItemOne}
          value={contactData.name}
          onChange={handleChangeContactData('name')}
          variant="outlined"
          size="medium"
          placeholder="Name"
          fullWidth
        />
        <TextField
          className={classes.inputGroupItemTwo}
          value={contactData.location}
          onChange={handleChangeContactData('location')}
          variant="outlined"
          size="medium"
          placeholder="Location"
          fullWidth
        />
      </div>

      <TextMultiSelect
        className={classes.input}
        label="Groups"
        onChange={handleChangeContactData('groups')}
        defaultValue={contactData.groups.map(group => ({ label: group, value: group }))}
        options={groups.map(group => ({ label: group, value: group }))}
        canAdd
        helperText="Groups this contact belongs to. Hint: Press enter to add new non-existant group."
        size="medium"
      />
      
      <div className={classes.inputGroup}>
        <SelectInput
          className={classes.inputGroupItemOne}
          value={contactData.gender}
          options={Object.keys(Gender)}
          onChange={handleChangeContactData('gender')}
          label="Gender"
        />
        <SelectInput
          className={classes.inputGroupItemTwo}
          value={contactData.relationshipStatus}
          options={Object.keys(RelationshipStatus)}
          onChange={handleChangeContactData('relationshipStatus')}
          label="Relationship"
        />
      </div>

      <div className={classes.switchContainer}>
        <Typography variant="h5">One-On-One Interaction: </Typography>
        <SwitchInput
          isChecked={contactData.oneOnOne}
          onChange={() => handleChangeContactData('oneOnOne')(!contactData.oneOnOne)}
          className={classes.onOneOneSwitch}
          uncheckedIcon={<PeopleAltIcon style={{ height: '1.2em', width: '1.2em' }} />}
          checkedIcon={<PersonIcon style={{ height: '1.2em', width: '1.2em' }} />}
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