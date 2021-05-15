import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';
import EventsToolbar from '@contacts/components/EventsPanel/EventsToolbar';
import EventListItem from '@contacts/components/EventsPanel/EventListItem';
import EventInfo from '@contacts/components/EventsPanel/EventInfo';
import EventsFilters from '@contacts/components/EventsPanel/EventsFilters';
import { ConfirmationDialog } from '@core/components/ConfirmationDialog';
import defaultEventFilters from '@contacts/utils/defaultEventFilters';
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
  const [eventsFilters, setEventsFilters] = React.useState(defaultEventFilters);
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
  const [isFiltersPanelOpen, setFiltersPanelOpen] = React.useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const eventsList = getEventsArray(events, eventsFilters);

  const toggleFilterPanel = () => {
    setFiltersPanelOpen(!isFiltersPanelOpen);
  }
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
  const handleChangeFilter = (property) => (value) => {
    setEventsFilters({
      ...eventsFilters,
      [property]: value
    });
  }
  const handleDeleteEvent = () => {
    actions.deleteEvent(selectedEvent);
    handleCloseInfoPanel();
    toggleConfirmationDialog();
  }

  return (
    <div className={classes.container}>
      <EventsToolbar 
        onOpenInfo={handleOpenInfoPanel} 
        toggleFilterPanel={toggleFilterPanel} 
      />
      <div>
        {eventsList.map(event => (
          <EventListItem 
            key={event.id} 
            event={event} 
            activities={activities}
            contacts={contacts} 
            onOpenInfo={handleOpenInfoPanel}
          />
        ))}
      </div>
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
      <EventsFilters 
        isOpen={isFiltersPanelOpen}
        onClose={toggleFilterPanel}
        eventsFilters={eventsFilters}
        onChangeFilter={handleChangeFilter}
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