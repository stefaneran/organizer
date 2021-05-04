export default (events) => {
  const eventsArray = Object.keys(events).map(eventId => ({
    id: eventId,
    ...events[eventId]
  }));
  let filteredEvents = eventsArray;
  return filteredEvents;
}