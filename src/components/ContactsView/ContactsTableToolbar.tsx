import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
  },
  pressed: {
    background: 'rgba(0, 0, 0, 0.2)'
  }
}));

const ContactsTableToolbar = ({ 
  nameFilter, 
  onNameChange, 
  locationFilter, 
  onLocationChange,
  sortOrder,
  onSort
}) => {
  const classes = useStyles();

  const handleSort = (order) => () => onSort(order);

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
        <Grid item>
          <IconButton 
            className={sortOrder === 'ascending' ? classes.pressed : ''} 
            onClick={handleSort('ascending')} 
            style={{ padding: '8px', marginRight: '0.5em' }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton 
            className={sortOrder === 'descending' ? classes.pressed : ''} 
            onClick={handleSort('descending')} 
            style={{ padding: '8px' }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ContactsTableToolbar;