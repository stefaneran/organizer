import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { createContact, editContact } from 'contacts/store/thunks';
// Icons
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
// Components
import { TextField, Typography } from '@material-ui/core';
import EditButtonGroup from 'contacts/components/EditButtonGroup';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import SelectInput from '@core/components/inputs/SelectInput';
import SwitchInput from '@core/components/inputs/SwitchInput';
// Utils
import defaultContactProps from 'contacts/utils/defaultContactProps';
import getEnumValues from '@core/utils/getEnumValues';
// Types
import { Option, RootState, AppDispatch } from '@core/types';
import { Contact, Genders, RelationshipStatus } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
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
  onClose: () => void;
  toggleEdit: () => void;
  onDeleteContact: () => void;
}

const ContactInfo: React.FC<Props> = ({ 
  contact,
  contactId,
  onClose,
  toggleEdit,
  onDeleteContact
 }) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { groups } = useSelector((state: RootState) => state.contactsStore);

  const isCreate = !Boolean(contactId);

  const [contactData, setContactData] = React.useState(isCreate ? defaultContactProps : contact);

  React.useEffect(() => {
    if (isCreate) {
      setContactData(defaultContactProps);
    } else {
      setContactData(contact);
    }
  }, [contactId])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeContactData = (property: string) => (eventOrValue: any) => {
    let value = eventOrValue.target?.value ?? eventOrValue;
    if (property === 'groups') {
      value = value.map((v: Option) => v.value);
    }
    setContactData({
      ...contactData,
      [property]: value
    })
  }
  const handleSubmit = async () => {
    if (isCreate) {
      await dispatch(createContact(contactData));
      onClose();
    } else {
      await dispatch(editContact(contactId, contactData));
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
          options={getEnumValues(Genders)}
          onChange={handleChangeContactData('gender')}
          label="Gender"
        />
        <SelectInput
          className={classes.inputGroupItemTwo}
          value={contactData.relationshipStatus}
          options={getEnumValues(RelationshipStatus)}
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