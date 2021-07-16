import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import SelectInput from 'core/components/inputs/SelectInput';
import SwitchInput from 'core/components/inputs/SwitchInput';
import getEnumValues from 'core/utils/getEnumValues';
import { ContactFilters, Genders, RelationshipStatus, SortOption } from 'contacts/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  sortSelect: {
    marginTop: '1em',
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
  contactsFilters: ContactFilters;
  onChangeFilter: (property: string) => (event: any) => void;
}

const ContactsFilters: React.FC<Props> = ({
  contactsFilters,
  onChangeFilter
 }) => {
  const classes = useStyles();

  return (
    <>
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
      <SelectInput
        className={classes.sortSelect}
        value={contactsFilters.sort}
        options={getEnumValues(SortOption)}
        onChange={onChangeFilter('sort')}
        label="Sort By"
      />
      <div style={{ textAlign: 'center' }}>
        <SwitchInput
          isChecked={contactsFilters.oneOnOne}
          onChange={() => onChangeFilter('oneOnOne')(!contactsFilters.oneOnOne)}
          className={classes.onOneOneSwitch}
          uncheckedIcon={<PeopleAltIcon style={{ height: '1.2em', width: '1.2em' }} />}
          checkedIcon={<PersonIcon style={{ height: '1.2em', width: '1.2em' }} />}
        />
      </div>
    </>
  )
}

export default ContactsFilters;