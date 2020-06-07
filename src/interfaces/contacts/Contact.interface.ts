import { ContactHistoryLog } from '@interfaces/ContactHistoryLog.interface';
import { PriorityType } from '@interfaces/general';

interface Contact {
  name: string;
  // Country and city, shape at discretion of user
  location: string;
  // Which social circles this person is a part of (ex: Coworkers, Business Contact, College)
  subgroups: string[];
  // Which other people this person has a relation with
  relations: string[];
  info: string;
  lastActivity: number;
  priority: PriorityType;
  interactionHistory: ContactHistoryLog[];
}

export default Contact;