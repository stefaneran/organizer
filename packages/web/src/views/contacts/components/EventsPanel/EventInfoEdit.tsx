import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { createEvent, editEvent } from 'contacts/store/thunks';
// Components
import { Typography, TextField } from '@material-ui/core';
import EditButtonGroup from 'contacts/components/EditButtonGroup';
import SelectInput from '@core/components/inputs/SelectInput';
import TextMultiSelect from '@core/components/inputs/TextMultiSelect';
import DateTimePicker from '@core/components/inputs/DateTimePicker'; 
// Utils
import defaultEventProps from 'contacts/utils/defaultEventProps';
import getActivityOptions from 'activities/utils/getActivityOptions';
import getActivityLocations from 'activities/utils/getActivityLocations';
import getContactsByIds from 'contacts/utils/getContactsByIds';
import getContactsArray from 'contacts/utils/getContactsArray';
import getEnumValues from '@core/utils/getEnumValues';
// Types
import { Event } from 'contacts/types';
import { Activity, ActivityType } from 'activities/types';
import { Option, RootState, AppDispatch, SelectEvent } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  headline: {
    position: 'absolute',
    top: '0.5em',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  inputGroup: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputGroupItemOne: {
    width: '100%',
    marginRight: '0.5em'
  },
  inputGroupItemTwo: {
    width: '100%'
  },
  input: {
    width: '100%',
    marginTop: '1em'
  },
}));

interface Props {
  event: Event;
  eventId: string;
  toggleEdit: () => void;
  onClose: () => void;
  onDeleteEvent: () => void;
}

const EventInfoEdit: React.FC<Props> = ({ 
  event, 
  eventId,
  toggleEdit,
  onClose,
  onDeleteEvent,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const { contacts } = useSelector((state: RootState) => state.contactsStore)
  const { activities } = useSelector((state: RootState) => state.activitiesStore)
  
  const isCreate = !Boolean(eventId);

  const [eventData, setEventData] = 
    React.useState<Event>(isCreate ? defaultEventProps : event);
  const [activityType, setActivityType] = 
    React.useState<ActivityType>(isCreate ? ActivityType.Other : activities[event.activityId]?.activityType);
  const [activityOptions, setActivityOptions] = 
    React.useState<Option[]>(getActivityOptions(activities, activityType));

  const activityTypes: string[] = getEnumValues(ActivityType);
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
  
  const handleChangeActivityType = (event: SelectEvent<ActivityType>) => {
    const value: ActivityType = event?.target?.value ?? ActivityType.Other; 
    setActivityType(value);
    setEventData({ 
      ...eventData,  
      activityId: '',
      activityLocationIndex: 0
    })
  }
  const handleChangeDateTime = (datetime: Date) => {
    const timestamp = datetime.getTime();
    handleChangeEventData('date')(timestamp);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeEventData = (property: string) => (eventOrValue: any) => {
    let value = eventOrValue.target?.value ?? eventOrValue;
    if (property === 'participants') {
      value = value.map((v: Option) => v.value);
    }
    setEventData({
      ...eventData,
      [property]: value
    });
  }
  const handleSubmit = async () => {
    if (isCreate) {
      await dispatch(createEvent(eventData));
      onClose();
    } else {
      await dispatch(editEvent(eventId, eventData));
      toggleEdit();
    }
  }

  return (
    <>

      <Typography variant="h4" className={classes.headline}>
        {isCreate ? 'Create New Event' : 'Edit Event Details'}
      </Typography>

      <TextField
        className={classes.input}
        value={eventData?.title}
        onChange={handleChangeEventData('title')}
        variant="outlined"
        label="Event Title"
        placeholder="Title (Optional)"
        size="medium"
      />

      <div className={classes.inputGroup}>
        <SelectInput
          className={classes.inputGroupItemOne}
          value={activityType}
          onChange={handleChangeActivityType}
          label="Activity Type"
          options={activityTypes || []}
        />
        <SelectInput
          className={classes.inputGroupItemTwo}
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
          className={classes.input}
          value={eventData.activityLocationIndex}
          onChange={handleChangeEventData('activityLocationIndex')}
          label="Location"
          options={[
            { name: "None", address: "" }, 
            ...getActivityLocations(activities, eventData.activityId)
          ]}
          getOptionKey={(option) => option.name}
          getOptionValue={(option, index) => index} 
          getOptionLabel={(option) => option.name}
        />
      ) : null}

      <TextMultiSelect
        className={classes.input}
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

export default EventInfoEdit;