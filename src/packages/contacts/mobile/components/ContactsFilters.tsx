import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InputLabel, TextField, NativeSelect  } from '@material-ui/core';
// Icons
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
// Components
import SelectInput from '@core/components/inputs/SelectInput';
import SwitchInput from '@core/components/inputs/SwitchInput';
// Utils
import getEnumValues from '@core/utils/getEnumValues';
// Types
import { ContactFilters, Genders, RelationshipStatus, SortOption } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
  mobileTextfield: {
    fontSize: '3em',
    '& > div': {
      fontSize: '1em'
    }
  },
  mobileSelect: {
    width: '100%',
    fontSize: '3em',
    '& > div': {
      fontSize: '1em'
    },
    '& option': {
      fontSize: '1rem'
    }
  },
  mobileSwitch: {
    marginTop: '2.5em',
    justifyContent: 'center',
    '& > span': {
      margin: '0 2em',
      transform: 'scale(3)',
      position: 'relative',
      top: '1.6em'
    }
  },
  label: {
    fontSize: '3em',
    marginTop: '0.7em',
    marginBottom: '0.3em'
  },
  navRight: {
    position: 'absolute',
    right: '3em',
    top: '2em'
  },
}));

interface Props {
  contactsFilters: ContactFilters;
  toggleFilterMenuOpen: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeFilter: (property: string) => (eventOrValue: any) => void;
}

const ContactsFilters: React.FC<Props> = ({
  contactsFilters,
  toggleFilterMenuOpen,
  onChangeFilter
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.navRight} onClick={toggleFilterMenuOpen}>
        <FilterListIconLarge />
      </div>
      <InputLabel className={classes.label}>Name</InputLabel>
      <TextField 
        className={classes.mobileTextfield}
        value={contactsFilters.name}
        onChange={onChangeFilter('name')}
        size="medium"
        variant="outlined"
        fullWidth
      />
      <InputLabel className={classes.label}>Location</InputLabel>
      <TextField
        className={classes.mobileTextfield} 
        value={contactsFilters.location}
        onChange={onChangeFilter('location')}
        size="medium"
        variant="outlined"
        fullWidth
      />
      <InputLabel className={classes.label}>Gender</InputLabel>
      <SelectInput
        native
        className={classes.mobileSelect}
        value={contactsFilters.gender}
        options={['All', ...Object.keys(Genders)]}
        onChange={onChangeFilter('gender')}
      />
      <InputLabel className={classes.label}>Relationship</InputLabel>
      <SelectInput
        native
        className={classes.mobileSelect}
        value={contactsFilters.relationshipStatus}
        options={['All', ...Object.keys(RelationshipStatus)]}
        onChange={onChangeFilter('relationshipStatus')}
      />
      <InputLabel className={classes.label}>Sort By</InputLabel>
      <SelectInput
        native
        className={classes.mobileSelect}
        value={contactsFilters.sort}
        options={getEnumValues(SortOption)}
        onChange={onChangeFilter('sort')}
      />
      <SwitchInput
        className={classes.mobileSwitch}
        isChecked={contactsFilters.oneOnOne}
        onChange={onChangeFilter('oneOnOne')}
        uncheckedIcon={<PeopleAltIcon style={{ height: '4em', width: '4em' }} />}
        checkedIcon={<PersonIcon style={{ height: '4em', width: '4em' }} />}
      />
    </>
  )
}

export default ContactsFilters;