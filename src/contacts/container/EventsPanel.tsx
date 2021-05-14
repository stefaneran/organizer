import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import EventsToolbar from '@contacts/components/EventsPanel/EventsToolbar';
import EventsList from '@contacts/components/EventsPanel/EventsList';
import EventInfo from '@contacts/components/EventsPanel/EventInfo';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';
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
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const eventsList = getEventsArray(events);

  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  const handleOpenInfoPanel = (eventId) => {
    setSelectedEvent(typeof eventId === 'string' ? eventId : '');
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedEvent('');
    setInfoPanelOpen(false);
  }
  const handleDeleteEvent = () => {
    actions.deleteEvent(selectedEvent);
    handleCloseInfoPanel();
    toggleConfirmationDialog();
  }

  return (
    <div className={classes.container}>
      <EventsToolbar onOpenInfo={handleOpenInfoPanel} />
      <EventsList 
        eventsList={eventsList} 
        activities={activities} 
        onOpenInfo={handleOpenInfoPanel}
      />
      {/* Sliding Panel */}
      <EventInfo
        event={events[selectedEvent]}
        eventId={selectedEvent}
        activities={activities}
        contacts={contacts}
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfoPanel}
        actions={actions}
        onDeleteEvent={handleDeleteEvent}
      />
      {isConfirmationOpen && (
        <ConfirmationDialog 
          isOpen 
          onClose={toggleConfirmationDialog}
          confirmationTitle={'Confirm To Delete Event'}
          confirmationText={`Are you sure you want to delete this event?`}
          secondaryIcon={<TrashIconXS />}
          primaryText="Cancel"
          secondaryText="Delete"
          onPrimaryAction={toggleConfirmationDialog}
          onSecondaryAction={handleDeleteEvent}
        />
      )}
    </div>
  )
}

export default EventsPanel;