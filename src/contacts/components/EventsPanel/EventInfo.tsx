import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import EventInfoEdit from '@contacts/components/EventsPanel/EventInfoEdit';
import Chips from '@contacts/components/Chips';
import Event from '@contacts/interfaces/Event.interface';
import Activity from '@activities/interfaces/Activity.interface';

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

  const [isEdit, setIsEdit] = React.useState(false);

  const activity: Activity = activities[event?.activityId];

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
              <Typography variant="h4">
                {activity?.name}
              </Typography>
              <Chips 
                memo={getParticipants}
                deps={[contacts, event?.participants]}
                getKey={(participant) => participant.id}
                getLabel={(participant) => participant.name}
              />
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

export default EventInfo;