import { ContactHistoryLog } from '@contacts/interfaces/ContactHistoryLog.interface';
import { PriorityType } from '@core/interfaces/general';

interface Contact {
  // Unique UUID which is also used for serialization in contactsStore.contacts object
  id: string;
  name: string;
  // Country and city, shape at discretion of user
  location: string;
  // Which social circles this person is a part of (ex: Coworkers, Business Contact, College)
  groups: string[];
  // Which other people this person has a relation with
  relations: string[];
  // Custom info user can type in for context such as contact background or how they met the contact, etc
  info: string;
  // Timestamp of last interaction - Updated automatically on hang out, or user can update manually to get rid of notification 
  lastInteraction: number;
  // Array of timestamps representing days user hung out with contact
  hangouts: number[];
  // TO DELETE
  // priority: PriorityType;
  // TO DELETE
  // interactionHistory: ContactHistoryLog[];
}

export default Contact;