import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
// Components
import EventInfoEdit from 'contacts/components/EventsPanel/EventInfoEdit';
import Chips from 'contacts/components/Chips';
import LocationLink from 'activities/components/LocationLink';
// Utils
import getActivityLocation from 'activities/utils/getActivityLocation';
// Types
import { ReduxProps } from 'contacts/container/ContactsConnector';
import { Contact, Event } from 'contacts/types';
import { Activity } from 'activities/types';

const useStyles = makeStyles(() => createStyles({
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
  activities: Record<string, Activity>;
  contacts: Record<string, Contact>;
  isOpen: boolean;
  onClose: () => void;
  onDeleteEvent: () => void;
  createEvent: ReduxProps["createEvent"];
  editEvent: ReduxProps["editEvent"];
}

const EventInfo: React.FC<Props> = ({ 
  event = {} as Event, 
  eventId, 
  activities,
  contacts,
  isOpen, 
  onClose,
  onDeleteEvent,
  createEvent,
  editEvent
}) => {
  const classes = useStyles();

  const { title, participants, activityId, activityLocationIndex } = event;

  const isCreate = !Boolean(eventId);
  const hasTitle = Boolean(title?.length)

  const [isEdit, setIsEdit] = React.useState(false);

  const activity: Activity = activities[activityId];
  const activityLocation = getActivityLocation(activities, activityId, activityLocationIndex)

  const getParticipants = () => participants?.map(participantId => ({ id: participantId, name: contacts[participantId].name })) ?? [];

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
              toggleEdit={toggleEdit}
              onClose={onClose}
              onDeleteEvent={onDeleteEvent}
              createEvent={createEvent}
              editEvent={editEvent}
            />
          ) : (
            <>
              <Typography className={classes.headline} variant="h4">
                {hasTitle ? title : activity?.name}
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
                  deps={[contacts, participants]}
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