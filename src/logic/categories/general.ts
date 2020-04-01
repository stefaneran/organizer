
export enum CategoryType {
  Skill,
  Fitness,
  Social
}

export enum PriorityType {
  Low,
  Moderate,
  High
}

export interface ICategory {
  name: string;
  type: CategoryType;
  priority: PriorityType;
}

export interface IHistoryLog {
  date_updated: number; // Timestamp
}