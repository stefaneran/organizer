export enum Genders {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export enum RelationshipStatus { 
  Single = "Single",
  Taken = "Taken",
  Unknown = "Unknown"
}

export enum SortOption { 
  LastContact = "Last Contact",
  Name = "Name",
  Location = "Location"
}

export interface ContactFilters {
  group: string;
  name: string;
  location: string;
  gender: Genders | 'All';
  relationshipStatus: RelationshipStatus | 'All';
  sort: SortOption;
  oneOnOne: boolean;
}

export interface EventFilters {
  showUpcoming: boolean;
  title: string;
}

export interface Contact {
  id?: string;
  name: string;
  location: string;
  groups: string[];
  gender: Genders;
  relationshipStatus: RelationshipStatus;
  oneOnOne: boolean; // Can you hang out with this person one on one or just in groups
  lastContact: number; // Last hangout or talk - Can be "snoozed" to represent keeping in touch
  lastHangout: number; // Last time user hung out with contact in the real world
  hangoutTally: number; // Number of times user hung out with contact,
  dateCreated: number; // Date contact was created (used for calculating averages)
}

export interface Event {
  id: string; // The event doesn't actually contain "id" prop until we add it in eventsToArray function
  title: string;
  participants: string[]; // IDs of contacts included
  activityId: string; // ID of activity
  activityLocationIndex: number; // Index of the activity location chosen
  date: number; // Timestamp
}