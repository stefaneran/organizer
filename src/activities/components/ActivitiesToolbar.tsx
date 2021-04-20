import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import ParticipantType from '@activities/interfaces/ParticipantType.enum';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '1em',
  },
  item: {
    marginRight: '0.5em',
    maxWidth: '150px'
  },
  select: { 
    height: '2.5em',
    '& > div': {
      paddingTop: '0',
      paddingBottom: '0'
    }
  },
}));

const ActivitiesToolbar = ({ 
  textFilter, 
  participantFilter, 
  onChangeTextFilter, 
  onChangeParticipantFilter,
  onAddNew
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Button 
        className={classes.item}
        color="primary" 
        variant="outlined" 
        onClick={onAddNew('new')}
      >
        New
      </Button>
      <TextField 
        className={classes.item} 
        value={textFilter} 
        onChange={onChangeTextFilter} 
        placeholder={"Activity name"} 
        variant="outlined"
        size="small"
      />
      <Select
        className={clsx(classes.item, classes.select)}
        value={participantFilter} 
        onChange={onChangeParticipantFilter}
        variant="outlined"
        fullWidth
      >
        <MenuItem value={"All"}>
          All
        </MenuItem>
        {Object.keys(ParticipantType).map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default ActivitiesToolbar;