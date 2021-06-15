import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SelectInput from '@core/components/inputs/SelectInput';
import { ActivityFilters, ParticipantType } from '@activities/types';
import { SelectEvent } from '@core/types';

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
  }
}));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activityFilters: ActivityFilters;
  onChangeFilter: (property: string) => (event: SelectEvent) => void;
}

const ActivitiesFilters: React.FC<Props> = ({
  isOpen,
  onClose,
  activityFilters,
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
        value={activityFilters.name}
        onChange={onChangeFilter('name')}
        size="medium"
        variant="outlined"
        label="Name"
      />
      <SelectInput
        className={classes.input}
        value={activityFilters.participants}
        options={['All', ...Object.keys(ParticipantType)]}
        onChange={onChangeFilter('participants')}
        label="Participants"
      />
    </div>
  )
}

export default ActivitiesFilters;