import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chipGroup: {
    marginBottom: '0.5em'
  },
  chipContainer: {
    marginRight: '0.5em',
  },
  chip: {
    background: '#fff',
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.light,
      color: '#fff'
    }
  }
}));

const ContactsGroups = ({ groups, selectedGroup, onChangeGroup }) => {
  const classes = useStyles();

  const isSelected = (chipName) => chipName === selectedGroup;

  return (
    <Grid container className={classes.chipGroup}>
      <Grid item className={classes.chipContainer}>
        <Chip 
          className={!isSelected('All') ? classes.chip : ''} 
          color={isSelected('All') ? "primary" : undefined}
          label="All" 
          onClick={onChangeGroup('All')} 
        />
      </Grid>
      {groups.length ? groups.map(group => (
        <Grid item key={group} className={classes.chipContainer}>
          <Chip 
            className={!isSelected(group) && classes.chip} 
            color={isSelected(group) ? "primary" : undefined}
            label={group} 
            onClick={onChangeGroup(group)} 
          />
        </Grid>
      )) : null}
    </Grid>
  );
}

export default ContactsGroups;