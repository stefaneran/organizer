import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    textAlign: 'left'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

const ContactInfoGroupsChips = ({ groups, onSelect }) => {
  const classes = useStyles();

  const handleSelect = (group) => () => {
    onSelect('group')(group);
  }

  return (
    <div className={classes.container}>
      <Chip 
        onClick={handleSelect('All')}
        className={classes.chip}
        label="All"
        color="primary"
      />
      {groups.length ? groups.map(group => (
        <Chip 
          onClick={handleSelect(group)}
          className={classes.chip}
          key={group} 
          label={group}
          color="primary"
        />
      )) : null}
    </div>
  )
}

export default ContactInfoGroupsChips;