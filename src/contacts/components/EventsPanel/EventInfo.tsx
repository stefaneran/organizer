import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import EventInfoEdit from '@contacts/components/EventsPanel/EventInfoEdit';
import Chips from '@contacts/components/Chips';
import { LocationLink } from '@activities/components/ActivityLocations';
import Event from '@contacts/interfaces/Event.interface';
import Activity from '@activities/interfaces/Activity.interface';
import getActivityLocations from '@contacts/utils/getActivityLocations';

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
  headline: {
    position: 'absolute',
    top: '0.5em',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  info: {
    textAlign: 'left'
  }
}));

interface Props {
  event: Event;
  eventId: string;
  activities;
  contacts;
  isOpen: boolean;
  onClose: () => void;
  actions;
  onDeleteEvent: () => void;
}

const EventInfo = ({ 
  event, 
  eventId, 
  activities,
  contacts,
  isOpen, 
  onClose,
  actions,
  onDeleteEvent
}: Props) => {
  const classes = useStyles();

  const isCreate = !Boolean(eventId);
  const hasTitle = Boolean(event?.title?.length)

  const [isEdit, setIsEdit] = React.useState(false);

  const activity: Activity = activities[event?.activityId];
  const activityLocation = getActivityLocations(activities, event?.activityId)[event?.activityLocationIndex];

  const getParticipants = () => event?.participants.map(participantId => ({ id: participantId, name: contacts[participantId].name })) ?? [];

  // Handles selecting an event or clicking to add new one
  React.useEffect(() => {
    if (isCreate) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [eventId]);
  
  const toggleEdit = () => setIsEdit(!isEdit);

  return (
    <div className={classes.sidepanel} style={{ left: isOpen ? '0%' : '-100%' }}>
      {isOpen ? (
        <>
          <div className={classes.topButtons}>
            {!isCreate ? (
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            ) : null}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {isEdit ? (
            <EventInfoEdit 
              event={event}
              eventId={eventId}
              activities={activities}
              contacts={contacts}
              onClose={onClose}
              toggleEdit={toggleEdit}
              createEvent={actions.createEvent}
              editEvent={actions.editEvent}
              onDeleteEvent={onDeleteEvent}
            />
          ) : (
            <>
              <Typography className={classes.headline} variant="h4">
                {hasTitle ? event?.title : activity?.name}
              </Typography>
              <div className={classes.info}>

                {hasTitle ? (
                  <Typography variant="h5">
                    {activity?.name}
                  </Typography>
                ) : null}

                <Typography variant="h6">
                  {activityLocation?.name}
                </Typography>

                <LocationLink address={activityLocation?.address} />

                <Chips 
                  memo={getParticipants}
                  deps={[contacts, event?.participants]}
                  getKey={(participant) => participant.id}
                  getLabel={(participant) => participant.name}
                />

              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

export default EventInfo;