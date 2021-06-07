export enum ActivityType {
  Food = "Food",
  Drinks = "Drinks",
  Cultural = "Cultural",
  Fitness = "Fitness",
  Sport = "Sport",
  Games = "Games",
  Trip = "Trip",
  Educational = "Educational",
  Entertainment = "Entertainment",
  Other = "Other"
}

export enum ParticipantType {
  Alone = "Alone",
  Pair = "Pair",
  Group = "Group"
}

export interface Activity {
  id: string; // The activity doesn't actually contain "id" prop until we add it in activitiesToArray function
  name: string;
  locations: ActivityLocation[];
  activityType: ActivityType;
  participantType: ParticipantType[];
}

export interface ActivityLocation {
  name: string;
  address: string;
}

export interface ActivityFilters {
  name: string;
  participants: "All" | ParticipantType;
}