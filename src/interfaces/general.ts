export enum CategoryType {
  Skill = "Skill",
  Contacts = "Contacts"
}

export enum PriorityType {
  Low = "Low",
  Moderate = "Moderate",
  High = "High"
}

export enum ActivityType {
  Unstarted = "Unstarted", // If lastActivity is null (Freshly created skill)
  Neglected = "Neglected", // If no activity in more than 7 days
  Paused = "Paused", // If activity in last 3-7 days
  Active = "Active" // If activity in last 3 days
}