import genericSort from '@core/utils/genericSort';
import { Event, EventFilters } from 'contacts/types';

const getEventsArray = (
  events: Record<string, Event>, 
  filters: EventFilters
): Event[] => {
  const eventsArray = Object.entries(events).map(([id, event]) => ({
    ...event,
    id,
  }));
  let filteredEvents = eventsArray;
  const now = Date.now();
  // Filter by title
  if (filters.title.length) {
    filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(filters.title.toLowerCase()))
  }
  // Show only upcoming by default (for now?)
  filteredEvents = filteredEvents.filter(event => event.date > now);

  return filteredEvents.sort((a, b) => genericSort(a.date, b.date));
}

export default getEventsArray;