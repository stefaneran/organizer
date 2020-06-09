import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Chip } from '@material-ui/core';
import getSubgroupsFromContacts from '@utils/getSubgroupsFromContacts';

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

const ContactsSubgroups = ({ contacts, selectedSubgroup, onChangeSubgroup }) => {
  const classes = useStyles();
  // TODO - Save subgroups to store
  const subgroups = getSubgroupsFromContacts(contacts);

  const isSelected = (chipName) => chipName === selectedSubgroup;

  return (
    <Grid container className={classes.chipGroup}>
      <Grid item className={classes.chipContainer}>
        <Chip 
          className={!isSelected('All') ? classes.chip : ''} 
          color={isSelected('All') ? "primary" : undefined}
          label="All" 
          onClick={onChangeSubgroup('All')} 
        />
      </Grid>
      {subgroups.length ? subgroups.map(subgroup => (
        <Grid item key={subgroup} className={classes.chipContainer}>
          <Chip 
            className={!isSelected(subgroup) && classes.chip} 
            color={isSelected(subgroup) ? "primary" : undefined}
            label={subgroup} 
            onClick={onChangeSubgroup(subgroup)} 
          />
        </Grid>
      )) : null}
    </Grid>
  );
}

export default ContactsSubgroups;