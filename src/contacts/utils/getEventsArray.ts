import { Event, EventFilters } from '@contacts/types.d';

export default (
  events: Record<string, Event>, 
  filters: EventFilters
) => {
  const eventsArray = Object.keys(events).map(eventId => ({
    id: eventId,
    ...events[eventId]
  }));
  let filteredEvents = eventsArray;
  const now = Date.now();
  // Filter by title
  if (filters.title.length) {
    filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(filters.title.toLowerCase()))
  }
  // Filter by upcoming or past event date
  if (filters.showUpcoming) {
    filteredEvents = filteredEvents.filter(event => event.date >= now);
  }
  else {
    filteredEvents = filteredEvents.filter(event => event.date < now);
  }
  return filteredEvents;
}