interface Event {
  id?: string;
  participants: string[]; // IDs of contacts included
  activityId: string; // ID of activity
  activityLocationIndex: number; // Index of the activity location chosen
  date: number; // Timestamp
}

export default Event;