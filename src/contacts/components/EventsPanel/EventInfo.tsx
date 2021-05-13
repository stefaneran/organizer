import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import TextMultiSelect from '@core/components/TextMultiSelect';
import SelectInput from '@core/components/SelectInput';
import Event from '@contacts/interfaces/Event.interface';
import Activity from '@activities/interfaces/Activity.interface';
import ActivityType from '@activities/interfaces/ActivityType.enum';
import defaultEventProps from '@contacts/utils/defaultEventProps';
import ActivityLocation from '@activities/interfaces/ActivityLocation.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'left 300ms',
    background: '#ecedf0',
    padding: '1em'
  },
  topButtons: {
    textAlign: 'right'
  },
  activityTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1em',
    '& > div': {
      flexGrow: 1
    }
  },
  typeSelect: {
    marginRight: '1em'
  },
  locationSelect: {
    width: '100%'
  }
}));

interface Props {
  event: Event;
  eventId: string;
  activities;
  contacts;
  isOpen: boolean;
  onClose: () => void;
}

// TODO - Do I need this anymore?
const convertEventToFormData = (event, activity) => ({
  ...event
});

const getActivityType = (activities, activityId) => {
  return activities[activityId].activityType
}

const getActivityOptions = (activities, activityType) => {
  const matches = [];
  for (const id of Object.keys(activities)) {
    const activity = activities[id];
    if (activity.activityType === activityType) {
      matches.push({ label: activity.name, value: id });
    }
  }
  return matches;
}

const getActivityLocations = (activities, activityId): ActivityLocation[] => {
  const activity = activities[activityId];
  if (activity) {
    return activity.locations;
  }
  return [];
}

const EventInfo = ({ 
  event, 
  eventId, 
  activities,
  contacts,
  isOpen, 
  onClose 
}: Props) => {
  const classes = useStyles();
  const isCreate = !Boolean(eventId);

  const [isEdit, setIsEdit] = React.useState(false);
  const [eventData, setEventData] = React.useState(defaultEventProps);
  const [activityType, setActivityType] = React.useState('Other');
  const [activityOptions, setActivityOptions] = React.useState(getActivityOptions(activities, activityType));

  const activityTypes = Object.keys(ActivityType).map(type => type);
  const activity = activities[eventData.activityId];

  React.useEffect(() => {
    if (isCreate) {
      setEventData(defaultEventProps);
      setIsEdit(true);
    } else {
      setEventData(convertEventToFormData(event, activity));
      setIsEdit(false);
    }
  }, [eventId]);

  React.useEffect(() => {
    if (isEdit && !isCreate) {
      setActivityType(getActivityType(activities, eventId));
      setEventData(convertEventToFormData(event, activity));
    }
  }, [isEdit])

  React.useEffect(() => {
    setActivityOptions(getActivityOptions(activities, activityType));
  }, [activityType])
  
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  }
  const handleChangeActivityType = (e) => {
    setActivityType(e.target.value);
    setEventData({ 
      ...eventData,  
      activityId: '',
      activityLocationIndex: 0
    })
  }
  const handleChangeEventData = (property) => (eventOrValue) => {
    setEventData({
      ...eventData,
      [property]: eventOrValue.target.value
    });
  }
  const handleClose = () => {
    onClose();
  }

  return (
    <div className={classes.sidepanel} style={{ left: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        {!isCreate ? (
          <IconButton onClick={toggleEdit}>
            <EditIcon />
          </IconButton>
        ) : null}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {isEdit ? (
        <Typography variant="h4" style={{ marginBottom: '0.5em' }}>
          {isCreate ? 'Create New Event' : 'Edit Event Details'}
        </Typography>
      ) : null}

      {isEdit ? (
        <div>
          <div className={classes.activityTop}>
            <SelectInput
              className={classes.typeSelect}
              value={activityType}
              onChange={handleChangeActivityType}
              label="Activity Type"
              options={activityTypes || []}
              getOptionKey={(option) => option}
              getOptionValue={(option) => option} 
              getOptionLabel={(option) => option}
            />
            <SelectInput
              value={eventData.activityId}
              onChange={handleChangeEventData('activityId')}
              label="Activity"
              options={activityOptions || []}
              getOptionKey={(option) => option.value}
              getOptionValue={(option) => option.value} 
              getOptionLabel={(option) => option.label}
            />
          </div>
          {activity ? (
            <SelectInput
              className={classes.locationSelect}
              value={eventData.activityLocationIndex}
              onChange={handleChangeEventData('activityLocationIndex')}
              label="Location"
              options={getActivityLocations(activities, eventData.activityId)}
              getOptionKey={(option) => option.name}
              getOptionValue={(option, index) => index} 
              getOptionLabel={(option) => option.name}
            />
          ) : null}
        </div>
      ) : (
        <Typography variant="h4">
          {activity?.name}
        </Typography>
      )}

      {isEdit ? (
        <div></div>
      ) : (
        <div></div>
      )}

    </div>
  )
}

export default EventInfo;