import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ContactsSubgroups from './ContactsSubgroups';
import ContactsTableToolbar from './ContactsTableToolbar';
import ContactsTable from './ContactsTable';
import ContactPanel from './ContactPanel';

const { useState } = React;

const useStyles = makeStyles((theme: Theme) => createStyles({
  innerContainer: {
    height: '100%',
    maxWidth: 'none'
  }
}));

const ContactsView = ({ 
  store, 
  selectedContact, 
  selectedSubgroup, 
  onSelectContact,
  onChangeSubgroup,
  onInteraction,
  globalDialogActions
}) => {
  const classes = useStyles();
  const { data: { contacts } } = store;
  const { open } = globalDialogActions;

  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  const handleNameChange = (name, value) => setNameFilter(value);
  const handleLocationChange = (name, value) => setLocationFilter(value);

  const filters = {
    selectedSubgroup,
    nameFilter,
    locationFilter
  }

  return (
    <Grid className={classes.innerContainer} container item spacing={2} xs={11}>
      <Grid item xs={6}>
        <ContactsTableToolbar 
          nameFilter={nameFilter} 
          onNameChange={handleNameChange}
          locationFilter={locationFilter} 
          onLocationChange={handleLocationChange}
        />
        <ContactsSubgroups 
          contacts={contacts} 
          selectedSubgroup={selectedSubgroup}
          onChangeSubgroup={onChangeSubgroup} 
        />
        <ContactsTable 
          contacts={contacts} 
          filters={filters} 
          selectedContact={selectedContact}
          onInteraction={onInteraction}
          onSelectContact={onSelectContact}
        />
      </Grid>
      <Grid item xs={6}>
        {selectedContact && (
          <ContactPanel contact={selectedContact} openDialog={open} />
        )}
      </Grid>
    </Grid>
  )
}

export default ContactsView;