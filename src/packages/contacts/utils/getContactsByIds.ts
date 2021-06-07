import { Contact } from '@contacts/types';

export default (
  contacts: Record<string, Contact>, 
  contactsIds: string[]
): Contact[] => {
  return contactsIds.map(contactId => ({ ...contacts[contactId], id: contactId }));
}