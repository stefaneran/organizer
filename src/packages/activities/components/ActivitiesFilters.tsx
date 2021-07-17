import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SelectInput from 'core/components/inputs/SelectInput';
import { InputEvent, SelectEvent } from 'core/types';
import { ActivityFilters, ParticipantType } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
  input: {
    marginTop: '1em',
    width: '100%'
  }
}));

interface Props {
  activityFilters: ActivityFilters;
  onChangeFilter: (property: string) => (event: InputEvent | SelectEvent<string[]>) => void;
}

const ActivitiesFilters: React.FC<Props> = ({
  activityFilters,
  onChangeFilter
 }) => {
  const classes = useStyles();
  return (
    <>
      <TextField 
        className={classes.input}
        value={activityFilters.name}
        onChange={onChangeFilter('name')}
        size="medium"
        variant="outlined"
        label="Name"
        inputProps={{ "data-testid": "name-textfield" }}
      />
      <SelectInput
        className={classes.input}
        value={activityFilters.participants}
        options={['All', ...Object.keys(ParticipantType)]}
        onChange={onChangeFilter('participants')}
        label="Participants"
        inputProps={{ "data-testid": "participants-select" }}
      />
    </>
  )
}

export default ActivitiesFilters;