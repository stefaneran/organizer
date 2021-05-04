import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import EventsToolbar from '@contacts/components/EventsPanel/EventsToolbar';
import EventsList from '@contacts/components/EventsPanel/EventsList';
import EventInfo from '@contacts/components/EventsPanel/EventInfo';
import getEventsArray from '@contacts/utils/getEventsArray';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '50%',
    position: 'relative',
    padding: '1em',
    overflow: 'hidden'
  }
}));

const EventsPanel = ({ events, contacts, activities, actions }) => {
  const classes = useStyles();

  const [selectedEvent, setSelectedEvent] = React.useState('');
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);

  const eventsList = getEventsArray(events);

  const getActivityInfoFromId = (activityId) => {
    return activities[activityId];
  }
  const handleOpenInfoPanel = (eventId) => {
    setSelectedEvent(typeof eventId === 'string' ? eventId : '');
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedEvent('');
    setInfoPanelOpen(false);
  }

  return (
    <div className={classes.container}>
      <EventsToolbar onOpenInfo={handleOpenInfoPanel} />
      <EventsList 
        eventsList={eventsList} 
        getActivity={getActivityInfoFromId} 
        onOpenInfo={handleOpenInfoPanel}
      />
      {/* Sliding Panel */}
      <EventInfo
        event={events[selectedEvent]}
        eventId={selectedEvent}
        activities={activities}
        getActivity={getActivityInfoFromId}
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfoPanel}
      />
    </div>
  )
}

export default EventsPanel;