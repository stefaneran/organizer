import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chipGroup: {
    marginBottom: '0.5em'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

const getSubgroups = (contacts) => {
  const subgroups = [];
  contacts.forEach(person => {
    person.subgroups.forEach(subgroup => {
      if (!subgroups.includes(subgroup)) {
        subgroups.push(subgroup);
      }
    })
  })
  return subgroups;
}

const ContactsSubgroups = ({ contacts, onChangeSubgroup }) => {
  const classes = useStyles();
  // TODO - Save subgroups to store
  const subgroups = getSubgroups(contacts);

  return (
    <Grid container className={classes.chipGroup}>
      <Grid item className={classes.chip}>
        <Chip label="All" onClick={onChangeSubgroup('All')} />
      </Grid>
      {subgroups.length ? subgroups.map(subgroup => (
        <Grid item key={subgroup} className={classes.chip}>
          <Chip label={subgroup} onClick={onChangeSubgroup(subgroup)} />
        </Grid>
      )) : null}
    </Grid>
  );
}

export default ContactsSubgroups;