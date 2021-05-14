import Contact from '@contacts/interfaces/Contact.interface';

export default (contacts, contactsIds): Contact[] => {
  return contactsIds.map(contactId => ({ ...contacts[contactId], id: contactId }));
}