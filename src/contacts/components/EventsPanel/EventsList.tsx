import * as React from 'react';
import EventListItem from '@contacts/components/EventsPanel/EventListItem';

const EventsList = ({ eventsList, activities, onOpenInfo }) => {
  return (
    <div>
      {eventsList.map(event => (
        <EventListItem 
          key={event.id} 
          event={event} 
          activities={activities} 
          onOpenInfo={onOpenInfo}
        />
      ))}
    </div>
  )
}

export default EventsList;