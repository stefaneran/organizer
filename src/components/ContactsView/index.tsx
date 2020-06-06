import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ContactsSubgroups from './ContactsSubgroups';
import ContactsTableToolbar from './ContactsTableToolbar';
import ContactsTable from './ContactsTable';

const { useState } = React;

const useStyles = makeStyles((theme: Theme) => createStyles({
  innerContainer: {
    height: '100%',
    maxWidth: 'none'
  }
}));

const ContactsView = ({ store }) => {
  const classes = useStyles();
  const { data: { contacts } } = store;

  const [selectedSubgroup, setSelectedSubgroup] = useState('All');
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleChangeSubgroup = (subgroup) => () => setSelectedSubgroup(subgroup);
  const handleNameChange = (name, value) => setNameFilter(value);
  const handleLocationChange = (name, value) => setLocationFilter(value);

  const filters = {
    selectedSubgroup,
    nameFilter,
    locationFilter
  }

  return (
    <Grid className={classes.innerContainer} container item spacing={1} xs={11}>
      <Grid container item xs={8} spacing={1} direction={'column'}>
        <ContactsSubgroups 
          contacts={contacts} 
          onChangeSubgroup={handleChangeSubgroup} 
        />
        <ContactsTableToolbar 
          nameFilter={nameFilter} 
          onNameChange={handleNameChange}
          locationFilter={locationFilter} 
          onLocationChange={handleLocationChange}
        />
        <ContactsTable 
          contacts={contacts} 
          filters={filters} 
        />
      </Grid>
      <Grid container item xs={4} spacing={1}>

      </Grid>
    </Grid>
  )
}

export default ContactsView;