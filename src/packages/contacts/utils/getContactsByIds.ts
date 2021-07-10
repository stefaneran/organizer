import { Contact } from '@contacts/types';

const getContactsByIds = (
  contacts: Record<string, Contact>, 
  contactsIds: string[]
): Contact[] => contactsIds.map(contactId => ({ ...contacts[contactId], id: contactId }));

export default getContactsByIds;