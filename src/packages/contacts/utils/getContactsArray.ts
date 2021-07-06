import { Contact, ContactFilters } from '@contacts/types';
import genericSort from '@core/utils/genericSort';

export default (
  contacts: Record<string, Contact>, 
  filters?: ContactFilters
): Contact[] => {
  const contactsArray = Object.keys(contacts).map(contactId => ({
    id: contactId,
    ...contacts[contactId]
  }));
  let filteredContacts = contactsArray;
  // Filter by selected group
  if (filters && filters.group !== 'All') {
    filteredContacts = filteredContacts.filter(contact => contact.groups.includes(filters.group))
  }
  // Filter by name
  if (filters && filters.name.length) {
    filteredContacts = filteredContacts.filter(contact => contact.name.toLowerCase().includes(filters.name.toLowerCase()))
  }
  // Filter by location
  if (filters && filters.location.length) {
    filteredContacts = filteredContacts.filter(contact => contact.location.toLowerCase().includes(filters.location.toLowerCase()))
  }
  // Filter by gender
  if (filters && filters.gender !== 'All') {
    filteredContacts = filteredContacts.filter(contact => contact.gender === filters.gender)
  }
  // Filter by relationship status
  if (filters && filters.relationshipStatus !== 'All') {
    filteredContacts = filteredContacts.filter(contact => contact.relationshipStatus === filters.relationshipStatus)
  }
  // Filter by abillity to see contact one-on-one
  if (filters && filters.oneOnOne) {
    filteredContacts = filteredContacts.filter(contact => contact.oneOnOne)
  }
  return filteredContacts.sort((a, b) => genericSort(a.name, b.name));
}