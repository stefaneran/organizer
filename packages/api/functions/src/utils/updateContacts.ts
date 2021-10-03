export default (contacts: any, events: any) => {

  for(const contactId in contacts) {
    const contact = contacts[contactId];
    contact.hangoutTally = 0;
  }

  // Iterate through all events
  for(const eventId in events) {
    const event = events[eventId];
    const { participants } = event;
    if (event.date < Date.now()) {
      for (let i = 0; i < participants.length; i++) {
        const contactId = participants[i];
        const contact = contacts[participants[i]];
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
  return contacts;
}