import { PersonHistoryLog } from '@interfaces/PersonHistoryLog.interface';
import { PriorityType } from '@interfaces/general';

interface Person {
  name: string;
  // Country and city, shape at discretion of user
  location: string;
  // Which social circles this person is a part of (ex: Coworkers, Business Contact, College)
  subgroups: string[];
  priority: PriorityType;
  info: string;
  lastActivity: number;
  interactionHistory: PersonHistoryLog[];
}

export default Person;