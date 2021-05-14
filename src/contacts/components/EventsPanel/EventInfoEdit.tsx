import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import EditButtonGroup from '@contacts/components/EditButtonGroup';
import SelectInput from '@core/components/inputs/SelectInput';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import DateTimePicker from '@core/components/inputs/DateTimePicker'; 
import Event from '@contacts/interfaces/Event.interface';
import Activity from '@activities/interfaces/Activity.interface';
import ActivityType from '@activities/interfaces/ActivityType.enum';
import defaultEventProps from '@contacts/utils/defaultEventProps';
import getActivityOptions from '@contacts/utils/getActivityOptions';
import getActivityLocations from '@contacts/utils/getActivityLocations';
import getContactsByIds from '@contacts/utils/getContactsByIds';
import getContactsArray from '@contacts/utils/getContactsArray';

const useStyles = makeStyles((theme: Theme) => createStyles({
  activityTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1em',
  },
  typeSelect: {
    width: '100%',
    marginRight: '0.5em'
  },
  activitySelect: {
    width: '100%',
  },
  locationSelect: {
    width: '100%',
    marginBottom: '0.5em'
  },
  participantsAutocomplete: {
    width: '100%',
  }
}));

interface Props {
  event: Event;
  eventId: string;
  activities;
  contacts;
  onClose: () => void;
  toggleEdit: () => void;
  createEvent: Function;
  editEvent: Function;
  onDeleteEvent: () => void;
}

const getActivityType = (activities, activityId) => {
  return activities[activityId].activityType
}

const EventInfo = ({ 
  event, 
  eventId, 
  activities,
  contacts,
  onClose,
  toggleEdit,
  createEvent,
  editEvent,
  onDeleteEvent
}: Props) => {
  const classes = useStyles();
  const isCreate = !Boolean(eventId);

  const [eventData, setEventData] = React.useState(isCreate ? defaultEventProps : event);
  const [activityType, setActivityType] = React.useState(isCreate ? ActivityType.Other : getActivityType(activities, event.activityId));
  const [activityOptions, setActivityOptions] = React.useState(getActivityOptions(activities, activityType));

  const activityTypes: ActivityType[] = Object.keys(ActivityType).map((type: ActivityType) => type);
  const activity: Activity = activities[eventData?.activityId];
  const participants = getContactsByIds(contacts, eventData?.participants).map(p => ({ label: p.name, value: p.id }));

  const contactsOptions = React.useMemo(() => 
    getContactsArray(contacts).map(contact => ({ label: contact.name, value: contact.id })),
    [contacts]
  );

  // Handles selecting an event or clicking to add new one
  React.useEffect(() => {
    if (isCreate) {
      setEventData(defaultEventProps);
      setActivityType(ActivityType.Other);
    } else {
      setEventData({ ...event });
    }
  }, [eventId]);

  // Handles changing activity type select input
  React.useEffect(() => {
    setActivityOptions(getActivityOptions(activities, activityType));
  }, [activityType])
  
  const handleChangeActivityType = (e) => {
    setActivityType(e.target.value);
    setEventData({ 
      ...eventData,  
      activityId: '',
      activityLocationIndex: 0
    })
  }
  const handleChangeDateTime = (datetime) => {
    const timestamp = datetime.getTime();
    handleChangeEventData('date')(timestamp);
  }
  const handleChangeEventData = (property) => (eventOrValue) => {
    let value = eventOrValue.target?.value ?? eventOrValue;
    if (property === 'participants') {
      value = value.map(v => v.value);
    }
    setEventData({
      ...eventData,
      [property]: value
    });
  }
  const handleSubmit = async () => {
    if (isCreate) {
      await createEvent(eventData);
      onClose();
    } else {
      await editEvent(eventId, eventData);
      toggleEdit();
    }
  }

  return (
    <>

      <Typography variant="h4" style={{ marginBottom: '0.5em' }}>
        {isCreate ? 'Create New Event' : 'Edit Event Details'}
      </Typography>

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
          className={classes.activitySelect}
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

      <TextMultiSelect
        className={classes.participantsAutocomplete}
        label="Participants"
        onChange={handleChangeEventData('participants')}
        defaultValue={participants}
        options={contactsOptions}
        size="medium"
      />

      <DateTimePicker 
        value={new Date(eventData.date)}
        onChange={handleChangeDateTime}
        label="Event"
      /> 

      <EditButtonGroup 
        isCreate={isCreate}
        onSubmit={handleSubmit}
        onDelete={onDeleteEvent}
        onClose={onClose}
      />

    </>
  )
}

export default EventInfo;