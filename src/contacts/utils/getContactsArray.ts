export default (contacts, filters) => {
  const contactsArray = Object.keys(contacts).map(contactId => ({
    id: contactId,
    ...contacts[contactId]
  }));
  let filteredContacts = contactsArray;
  // Filter by selected group
  if (filters.group !== 'All') {
    filteredContacts = contactsArray.filter(contact => contact.groups.includes(filters.group))
  }
  // Filter by name
  if (filters.name.length) {
    filteredContacts = filteredContacts.filter(contact => contact.name.toLowerCase().includes(filters.name.toLowerCase()))
  }
  // Filter by location
  if (filters.location.length) {
    filteredContacts = filteredContacts.filter(contact => contact.location.toLowerCase().includes(filters.location.toLowerCase()))
  }
  return filteredContacts;
}