import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, Select, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import TextMultiSelect from '@core/components/TextMultiSelect';
import Event from '@contacts/interfaces/Event.interface';
import Activity from '@activities/interfaces/Activity.interface';
import ActivityType from '@activities/interfaces/ActivityType.enum';
import defaultEventProps from '@contacts/utils/defaultEventProps';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'left 300ms',
    background: '#ecedf0'
  },
  topButtons: {
    textAlign: 'right'
  },
  editActivity: {
    display: 'flex'
  },
  select: { 
    height: '2.5em',
    width: '150px',
    '& > div': {
      paddingTop: '0',
      paddingBottom: '0'
    }
  },
  autocomplete: {
    width: '200px'
  }
}));

interface Props {
  event: Event;
  eventId: string;
  activities;
  getActivity: (id: string) => Activity;
  isOpen: boolean;
  onClose: () => void;
}

const convertEventToFormData = (event, activity) => ({
  ...event
});

const getActivityOptions = (activities, activityType) => {
  const matches = [];
  for (const id of Object.keys(activities)) {
    const activity = activities[id];
    if (activity.activityType === activityType) {
      matches.push({ label: activity.name, value: activity.name });
    }
  }
  return matches;
}

const EventInfo = ({ 
  event, 
  eventId, 
  activities,
  isOpen, 
  onClose 
}: Props) => {
  const classes = useStyles();
  const isCreate = Boolean(!eventId);

  const [isEdit, setIsEdit] = React.useState(false);
  const [eventData, setEventData] = React.useState(defaultEventProps);
  const [activityType, setActivityType] = React.useState('Other');
  const [activityOptions, setActivityOptions] = React.useState(getActivityOptions(activities, activityType));

  const activityTypes = Object.keys(ActivityType).map(type => type);
  const activity = activities[eventData.activityId];

  console.log(activityOptions)

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
    setActivityOptions(getActivityOptions(activities, activityType));
  }, [activityType])
  
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  }
  const handleChangeActivityType = (e) => {
    setActivityType(e.target.value);
  }
  const handleChangeEventData = (property) => (eventOrValue) => {
    setEventData({
      ...eventData,
      [property]: eventOrValue.target.value
    });
  }
  const handleClose = () => {
    setIsEdit(false);
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
        <div className={classes.editActivity}>
          <Select
            value={activityType}
            onChange={handleChangeActivityType}
            className={classes.select}
            label="Activity Type"
            variant="outlined"
          >
            {activityTypes?.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          <TextMultiSelect
            className={classes.autocomplete}
            label="Activity"
            onChange={(e) => { console.log(e) }}
            defaultValue={[]}
            options={activityOptions}
            size="small"
          />
        </div>
      ) : (
        <Typography variant="h4">
          {activity?.name}
        </Typography>
      )}

    </div>
  )
}

export default EventInfo;