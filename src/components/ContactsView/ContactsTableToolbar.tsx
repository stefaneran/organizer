import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import TextInput from '@components/FormInputs/TextInput';

const { useState } = React;

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: {
    padding: '0.4em 0.3em',
    marginBottom: '0.5em'
  },
  textInput: {
    width: '9em',
    marginRight: '0.5em'
  }
}));

const ContactsTableToolbar = ({ 
  nameFilter, 
  onNameChange, 
  locationFilter, 
  onLocationChange 
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.toolbar}>
      <Grid container>
        <Grid item>
          <TextInput 
            className={classes.textInput}
            name="name" 
            handleChange={onNameChange} 
            label={'Name'} 
            inputValue={nameFilter} 
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item>
          <TextInput 
            className={classes.textInput}
            name="location" 
            handleChange={onLocationChange} 
            label={'Location'} 
            inputValue={locationFilter} 
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ContactsTableToolbar;