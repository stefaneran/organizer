import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import SelectInput from '@core/components/inputs/SelectInput';
import SwitchInput from '@core/components/inputs/SwitchInput';
import getEnumValues from '@core/utils/getEnumValues';
import { ContactFilters, Genders, SortOption } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          options={['All', ...getEnumValues(Genders)]}
          onChange={onChangeFilter('gender')}
          label="Gender"
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
          onChange={onChangeFilter('oneOnOne')}
          className={classes.onOneOneSwitch}
          uncheckedIcon={<PeopleAltIcon style={{ height: '1.2em', width: '1.2em' }} />}
          checkedIcon={<PersonIcon style={{ height: '1.2em', width: '1.2em' }} />}
        />
      </div>
    </>
  )
}

export default ContactsFilters;