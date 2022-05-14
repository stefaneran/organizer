import { Contact, Event } from 'contacts/types';

const calculateContactRelationshipData = (
  contacts: Record<string, Contact>, 
  events: Record<string, Event>
): Record<string, Contact> => {

  const contactsCopy = { ...contacts };

  for(const contactId in contactsCopy) {
    const contact = contactsCopy[contactId];
    contact.hangoutTally = 0;
  }

  // Iterate through all events
  for(const eventId in events) {
    const event = events[eventId];
    const { participants } = event;
    if (event.date < Date.now()) {
      for (let i = 0; i < participants.length; i++) {
        const contactId = participants[i];
        const contact = contactsCopy[participants[i]];
        if (!contact) continue;

        // Update number of times hung out with contact
        contact.hangoutTally = contact.hangoutTally ? contact.hangoutTally + 1 : 1;
        // Update last contact date of the individual 
        if (contact.lastContact < event.date) {
          contact.lastContact = event.date;
        }
        if (contact.lastHangout < event.date) {
          contact.lastHangout = event.date;
        }
        // Update acquintances of the individual
        if (!contact.acquintances) {
          contact.acquintances = {};
        }
        for (const pId of participants) {
          if (pId === contactId) {
            continue;
          }
          if (contact.acquintances[pId]) {
            contact.acquintances[pId] = contact.acquintances[pId]++;
          } else {
            contact.acquintances[pId] = 1;
          }
        }
      }
    } 
  }
  return contactsCopy;
}

export default calculateContactRelationshipData;