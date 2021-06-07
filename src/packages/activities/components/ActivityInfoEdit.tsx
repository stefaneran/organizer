import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EditLocations from '@activities/components/EditLocations';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import SelectInput from '@core/components/inputs/SelectInput';
import defaultActivityProps from '@activities/utils/defaultActivityProps';
import checkIsLocationsEmpty from '@activities/utils/checkIsLocationsEmpty';
import { Activity, ActivityType, ParticipantType, ActivityLocation } from '@activities/types';

type Option = { label: string; value: string; }

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

interface Props {
  activityId: string;
  activity: Activity;
  onClose: () => void;
  toggleEdit: () => void;
  editActivity: Function;
  addActivity: Function;
}

const ActivityInfoEdit: React.FC<Props> = ({
  activityId,
  activity,
  onClose,
  toggleEdit,
  editActivity,
  addActivity
}) => {
  const classes = useStyles();
  const isCreate = !Boolean(activityId);

  const [activityData, setActivityData] = React.useState(isCreate ? defaultActivityProps : activity);

  React.useEffect(() => {
    if (isCreate) {
      setActivityData(defaultActivityProps);
    } else {
      setActivityData(activity);
    }
  }, [activityId]);

  const handleChangeActivityData = (property: string) => (eventOrValue: any): void => {
    let value = eventOrValue.target?.value ?? eventOrValue;
    if (property === 'participantType') {
      value = value.map((v: Option) => v.label);
    }
    setActivityData({
      ...activityData,
      [property]: value
    })
  }
  const handleLocationsChange = (index: number, location?: ActivityLocation) => {
    let locations = [ ...activityData?.locations ];
    // If no location, delete the sent index
    if (!location) {
      locations = locations.filter((loc, i) => i !== index);
    } else {
      locations[index] = { 
        name: location.name || '', 
        address: location.address || '' 
      };
    }
    handleChangeActivityData('locations')(locations);
  }
  const handleSubmit = async (): Promise<void> => {
    const { locations } = activityData;
    const submitData = {
      ...activityData,
      // Makes sure we don't save empty location objects
      locations: checkIsLocationsEmpty(locations) ? [] : locations
    }
    if (isCreate) {
      await addActivity(submitData);
      onClose();
    } else {
      await editActivity(activityId, submitData);
      toggleEdit();
    }
  }

  return (
    <div className={classes.container}>
      <TextField 
        className={classes.input}
        value={activityData?.name}
        onChange={handleChangeActivityData('name')}
        variant="outlined"
        size="medium"
        placeholder="Activity Name"
        fullWidth
      />
      <SelectInput
        value={activityData?.activityType} 
        onChange={handleChangeActivityData('activityType')}
        className={classes.input}
        label={'Type'}
        options={Object.keys(ActivityType)}
      />
      <TextMultiSelect
        label="Participants"
        onChange={handleChangeActivityData('participantType')}
        defaultValue={
          activityData?.participantType && activityData.participantType.map(type => ({ label: type, value: type }))
        }
        options={Object.keys(ParticipantType).map(type => ({ label: type, value: type }))}
        helperText="Number of participants for this activity (You alone, a date, or a hang out with several people)"
        size="medium"
      />
      <EditLocations 
        locations={activityData?.locations}
        onLocationsChange={handleLocationsChange}
      />
      <div className={classes.finishButtonContainer}>
        <Button
          className={classes.finishButton}
          variant="outlined" 
          color="primary"
          onClick={handleSubmit}
          endIcon={<LocalActivityIcon style={{ height: '0.9em', width: '0.9em', color: '#3f51b5' }} />}
        >
          Finish
        </Button>
        <Button
          variant="outlined" 
          color="secondary"
          onClick={onClose}
          endIcon={<CloseIcon />}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ActivityInfoEdit;