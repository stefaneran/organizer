import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EditLocations from '@activities/components/EditLocations';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import SelectInput from '@core/components/inputs/SelectInput';
import ActivityType from '@activities/interfaces/ActivityType.enum';
import ParticipantType from '@activities/interfaces/ParticipantType.enum';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '1em'
  },
  input: {
    marginBottom: '1em'
  },
  finishButtonContainer: {
    marginTop: '1em',
    textAlign: 'center'
  },
  finishButton: {
    marginRight: '1em'
  }
}));

const EditActivity = ({ 
  editActivityData, 
  setEditActivityData, 
  onSubmitEditActivity,
  onOpenEditActivity 
}) => {
  const classes = useStyles();

  const handleDataChange = (property, value) => {
    setEditActivityData({
      ...editActivityData,
      [property]: value
    })
  }
  const handleNameChange = (e) => {
    handleDataChange('name', e.target.value)
  }
  const handleActivityTypeChange = (e) => {
    handleDataChange('activityType', e.target.value)
  }
  const handleParticipantChange = (value) => {
    handleDataChange('participantType', value.map(v => v.label));
  }
  const handleLocationsChange = (index, location) => {
    let locations = [ ...editActivityData.locations ];
    // If location is undefined, delete the sent index
    if (!location) {
      locations = locations.filter((loc, i) => i !== index);
    } else {
      locations[index] = { 
        name: location.name || '', 
        address: location.address 
      };
    }
    handleDataChange('locations', locations);
  }

  return (
    <div className={classes.container}>
      <TextField 
        className={classes.input}
        value={editActivityData.name}
        onChange={handleNameChange}
        variant="outlined"
        size="medium"
        placeholder="Activity Name"
        fullWidth
      />
      <SelectInput
        value={editActivityData.activityType} 
        onChange={handleActivityTypeChange}
        className={classes.input}
        label={'Type'}
        options={Object.keys(ActivityType)}
      />
      <TextMultiSelect
        label="Participants"
        onChange={handleParticipantChange}
        defaultValue={
          editActivityData.participantType && editActivityData.participantType.map(type => ({ label: type, value: type }))
        }
        options={Object.keys(ParticipantType).map(type => ({ label: type, value: type }))}
        helperText="Number of participants for this activity (You alone, a date, or a hang out with several people)"
        size="medium"
      />
      <EditLocations 
        locations={editActivityData.locations}
        onLocationsChange={handleLocationsChange}
      />
      <div className={classes.finishButtonContainer}>
        <Button
          className={classes.finishButton}
          variant="outlined" 
          color="primary"
          onClick={onSubmitEditActivity}
          endIcon={<LocalActivityIcon style={{ height: '0.9em', width: '0.9em', color: '#3f51b5' }} />}
        >
          Finish
        </Button>
        <Button
          variant="outlined" 
          color="secondary"
          onClick={onOpenEditActivity('')}
          endIcon={<CloseIcon />}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default EditActivity;