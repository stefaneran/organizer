
export enum CategoryType {
  Skill = "Skill",
  Fitness = "Fitness",
  Social = "Social"
}

export enum PriorityType {
  Low = "Low",
  Moderate = "Moderate",
  High = "High"
}

export interface ICategory {
  name: string;
  type: CategoryType;
  priority: PriorityType;
}

export interface IHistoryLog {
  date_updated: number; // Timestamp
}