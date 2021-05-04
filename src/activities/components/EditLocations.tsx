import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, IconButton, Button } from '@material-ui/core';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    marginTop: '1em',
  },
  inputGroup: {
    display: 'flex',
    marginBottom: '0.5em'
  },
  input: { 
    width: '35%', 
    marginRight: '1em' 
  },
  deleteButton: {
    padding: '0 7px'
  },
  addButton: {
    marginTop: '0.5em'
  }
}))

const EditLocations = ({ locations, onLocationsChange }) => {
  const classes = useStyles();

  const handleNameInput = (index) => (e) => {
    const location = { 
      ...locations[index], 
      name: e.target.value 
    };
    onLocationsChange(index, location);
  }
  const handleAddressInput = (index) => (e) => {
    const location = { 
      ...locations[index], 
      address: e.target.value 
    };
    onLocationsChange(index, location);
  }
  const handleDeleteLocation = (index) => () => {
    onLocationsChange(index, undefined);
  }
  const handleAddLocation = () => {
    onLocationsChange(locations.length, { name: '', address: '' });
  }

  return (
    <div className={classes.container}>
      {locations.map((location, index) => (
        <div key={index} className={classes.inputGroup}>
          <TextField
            className={classes.input}
            value={location.name}
            onChange={handleNameInput(index)}
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            className={classes.input}
            value={location.address}
            onChange={handleAddressInput(index)}
            label="Address/Link"
            variant="outlined"
            size="small"
            fullWidth
          />
          {index !== 0 && (
            <IconButton 
              onClick={handleDeleteLocation(index)} 
              className={classes.deleteButton}
            >
              <TrashIconXS />
            </IconButton>
          )}
        </div>
      ))}
      <Button 
        onClick={handleAddLocation}
        className={classes.addButton}
        color="primary" 
        variant="outlined"
      >
        Add Location
      </Button>
    </div>
  )
}

export default EditLocations;