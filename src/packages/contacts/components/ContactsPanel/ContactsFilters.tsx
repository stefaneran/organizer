import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import SelectInput from '@core/components/inputs/SelectInput';
import SwitchInput from '@core/components/inputs/SwitchInput';
import { Genders, RelationshipStatus } from '@contacts/types';
import { ContactFilters } from '@contacts/utils/defaultContactFilters';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0',
    padding: '0 2em 0 2em'
  },
  topButtons: {
    textAlign: 'right'
  },
  input: {
    marginTop: '1em',
    width: '100%'
  },
  selectGroup: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  genderSelect: {
    width: '100%',
    marginRight: '0.5em'
  },
  relationshipSelect: {
    width: '100%'
  },
  onOneOneSwitch: {
    marginTop: '1em',
    justifyContent: 'center',
    '& > svg': {
      position: 'relative',
      top: '5px'
    }
  }
}));

interface Props {
  isOpen: boolean;
  onClose: ()=>void;
  contactsFilters: ContactFilters;
  onChangeFilter: (property: string) => (event) => void;
}

const ContactsFilters: React.FC<Props> = ({
  isOpen,
  onClose,
  contactsFilters,
  onChangeFilter
 }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <TextField 
        className={classes.input}
        value={contactsFilters.name}
        onChange={onChangeFilter('name')}
        size="medium"
        variant="outlined"
        label="Name"
      />
      <TextField
        className={classes.input} 
        value={contactsFilters.location}
        onChange={onChangeFilter('location')}
        size="medium"
        variant="outlined"
        label="Location"
      />
      <div className={classes.selectGroup}>
        <SelectInput
          className={classes.genderSelect}
          value={contactsFilters.gender}
          options={['All', ...Object.keys(Genders)]}
          onChange={onChangeFilter('gender')}
          label="Gender"
        />
        <SelectInput
          className={classes.relationshipSelect}
          value={contactsFilters.relationshipStatus}
          options={['All', ...Object.keys(RelationshipStatus)]}
          onChange={onChangeFilter('relationshipStatus')}
          label="Relationship"
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <SwitchInput
          isChecked={contactsFilters.oneOnOne}
          onChange={() => onChangeFilter('oneOnOne')(!contactsFilters.oneOnOne)}
          className={classes.onOneOneSwitch}
          uncheckedIcon={<PeopleAltIcon style={{ height: '1.2em', width: '1.2em' }} />}
          checkedIcon={<PersonIcon style={{ height: '1.2em', width: '1.2em' }} />}
        />
      </div>
    </div>
  )
}

export default ContactsFilters;