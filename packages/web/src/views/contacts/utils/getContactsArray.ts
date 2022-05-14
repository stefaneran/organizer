import { Contact, ContactFilters, SortOption } from 'contacts/types';
import genericSort from '@core/utils/genericSort';

const getContactsArray = (
  contacts: Record<string, Contact>, 
  filters?: ContactFilters
): Contact[] => {
  const contactsArray = Object.keys(contacts).map(contactId => ({
    id: contactId,
    ...contacts[contactId]
  }));
  if (!filters) {
    return contactsArray;
  }
  let filteredContacts = contactsArray;
  // Filter by selected group
  if (filters.group !== 'All') {
    filteredContacts = filteredContacts.filter(contact => contact.groups.includes(filters.group))
  }
  // Filter by name
  if (filters.name.length) {
    filteredContacts = filteredContacts.filter(contact => contact.name.toLowerCase().includes(filters.name.toLowerCase()))
  }
  // Filter by location
  if (filters.location.length) {
    filteredContacts = filteredContacts.filter(contact => contact.location.toLowerCase().includes(filters.location.toLowerCase()))
  }
  // Filter by gender
  if (filters.gender !== 'All') {
    filteredContacts = filteredContacts.filter(contact => contact.gender === filters.gender)
  }
  // Filter by abillity to see contact one-on-one
  if (filters.oneOnOne) {
    filteredContacts = filteredContacts.filter(contact => contact.oneOnOne)
  }
  let sortProperty = 'name';
  if (filters.sort === SortOption.Location) {
    sortProperty = 'location';
  } 
  else if (filters.sort === SortOption.LastContact) {
    sortProperty = 'lastContact';
  }
  return filteredContacts.sort((a, b) => genericSort(a[sortProperty], b[sortProperty]));
}

export default getContactsArray;