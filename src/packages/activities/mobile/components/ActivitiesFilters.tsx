import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InputLabel, TextField } from '@material-ui/core';
// Icons
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';
// Components
import SelectInput from '@core/components/inputs/SelectInput';
// Utils
import getEnumValues from '@core/utils/getEnumValues';
// Types
import { ActivityFilters, ParticipantType } from 'activities/types';

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
  activitiesFilters: ActivityFilters;
  toggleFilterMenuOpen: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeFilter: (property: string) => (eventOrValue: any) => void;
}

const ActivitiesFilters: React.FC<Props> = ({
  activitiesFilters,
  toggleFilterMenuOpen,
  onChangeFilter
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.navRight} onClick={toggleFilterMenuOpen}>
        <FilterListIconLarge />
      </div>
      <InputLabel className={classes.label}>Name</InputLabel>
      <TextField
        className={classes.mobileTextfield}
        value={activitiesFilters.name}
        onChange={onChangeFilter('name')}
        size="medium"
        variant="outlined"
      />
      <InputLabel className={classes.label}>Participants</InputLabel>
      <SelectInput
        native
        className={classes.mobileSelect}
        value={activitiesFilters.participants}
        options={['All', ...getEnumValues(ParticipantType)]}
        onChange={onChangeFilter('participants')}
      />
    </>
  )
}

export default ActivitiesFilters;