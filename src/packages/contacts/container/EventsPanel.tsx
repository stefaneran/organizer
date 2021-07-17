import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TrashIconXS } from 'core/components/Icons/DeleteIcon';
// Components
import EventsToolbar from 'contacts/components/EventsPanel/EventsToolbar';
import EventsList from 'contacts/components/EventsPanel/EventsList';
import EventInfo from 'contacts/components/EventsPanel/EventInfo';
import EventsFilters from 'contacts/components/EventsPanel/EventsFilters';
import ConfirmationDialog from 'core/components/ConfirmationDialog'; 
import SlidingPanel from 'core/components/SlidingPanel';
// Utils
import defaultEventFilters from 'contacts/utils/defaultEventFilters';
import getEventsArray from 'contacts/utils/getEventsArray';
// Types
import { Event, Contact } from 'contacts/types';
import { Activity } from 'activities/types';
import { DispatchProps } from './index';

const useStyles = makeStyles(() => createStyles({
  container: {
    width: '50%',
    position: 'relative',
    padding: '1em',
    overflow: 'hidden'
  }
}));

interface Props {
  events: Record<string, Event>; 
  contacts: Record<string, Contact>; 
  activities: Record<string, Activity>;
  actions: DispatchProps
}

const EventsPanel: React.FC<Props> = ({ 
  events, 
  contacts, 
  activities,
  actions 
}) => {
  const classes = useStyles();

  const [selectedEvent, setSelectedEvent] = React.useState('');
  const [eventsFilters, setEventsFilters] = React.useState(defaultEventFilters);
  const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
  const [isFiltersPanelOpen, setFiltersPanelOpen] = React.useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const eventsList = React.useMemo(() => 
    getEventsArray(events, eventsFilters), 
    [events, eventsFilters]
  );

  const toggleFilterPanel = () => {
    setFiltersPanelOpen(!isFiltersPanelOpen);
  }
  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!isConfirmationOpen);
  }
  const handleOpenInfoPanel = (eventId?: string) => {
    setSelectedEvent(typeof eventId === 'string' ? eventId : '');
    setInfoPanelOpen(true);
  }
  const handleCloseInfoPanel = () => {
    setSelectedEvent('');
    setInfoPanelOpen(false);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (property: string) => (eventOrValue: any) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
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
        eventsFilters={eventsFilters}
        onChangeFilter={handleChangeFilter}
      />
      <EventsList
        contacts={contacts}
        activities={activities}
        eventsList={eventsList}
        showUpcoming={eventsFilters.showUpcoming}
        onOpenInfoPanel={handleOpenInfoPanel}
      />
      {/* Sliding Panel */}
      <EventInfo
        event={events[selectedEvent]}
        eventId={selectedEvent}
        activities={activities}
        contacts={contacts}
        isOpen={isInfoPanelOpen}
        onClose={handleCloseInfoPanel}
        onDeleteEvent={toggleConfirmationDialog}
        createEvent={actions.createEvent}
        editEvent={actions.editEvent}
      />
      <SlidingPanel
        isOpen={isFiltersPanelOpen}
        onClose={toggleFilterPanel}
        direction="left"
        width={50}
      >
        <EventsFilters
          eventsFilters={eventsFilters}
          onChangeFilter={handleChangeFilter}
        />
      </SlidingPanel>
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