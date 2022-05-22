export enum Genders {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export enum SortOption {
  LastContact = "Last Contact",
  LastHangout = "Last Hangout",
  Name = "Name",
  Location = "Location"
}

export interface ContactFilters {
  group: string;
  name: string;
  location: string;
  gender: Genders | 'All';
  sort: SortOption;
  oneOnOne: boolean;
}

export interface EventFilters {
  title: string;
}

export interface Contact {
  id?: string;
  name: string;
  location: string;
  groups: string[];
  gender: Genders;
  // Can you hang out with this person one on one or just in groups
  oneOnOne: boolean;
  // Last hangout or talk - Can be "snoozed" to represent keeping in touch
  lastContact: number;
  // Last time user hung out with contact in the real world
  lastHangout: number;
  // Number of times user hung out with contact
  hangoutTally: number;
  // Number of days after which the hangout bar should be empty
  hangoutFrequency: number;
  // Date contact was created (used for calculating averages)
  dateCreated: number;
  // Other contacts this contact knows and the number of times they interacted
  acquintances: Record<string, number>;
}

export interface Event {
  id: string; // The event doesn't actually contain "id" prop until we add it in eventsToArray function
  title: string;
  participants: string[]; // IDs of contacts included
  activityId: string; // ID of activity
  activityLocationIndex: number; // Index of the activity location chosen
  date: number; // Timestamp
}