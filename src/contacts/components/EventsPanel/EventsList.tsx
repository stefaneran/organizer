import * as React from 'react';
import EventListItem from '@contacts/components/EventsPanel/EventListItem';

const EventsList = ({ eventsList, getActivity, onOpenInfo }) => {
  return (
    <div>
      {eventsList.map(event => (
        <EventListItem 
          key={event.id} 
          event={event} 
          getActivity={getActivity} 
          onOpenInfo={onOpenInfo}
        />
      ))}
    </div>
  )
}

export default EventsList;