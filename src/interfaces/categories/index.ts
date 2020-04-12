import { IHistoryLog } from "@interfaces/history";

export enum CategoryType {
  Skill = "Skill",
  Fitness = "Fitness",
  Social = "Social"
}

export enum CategoryPriorityType {
  Low = "Low",
  Moderate = "Moderate",
  High = "High"
}

export enum ActivityType {
  Unstarted = "Unstarted",
  Paused = "Paused",
  Neglected = "Neglected",
  Active = "Active"
}

export interface ICategory {
  title: string;
  description: string;
  lastActivity: number;
  categoryType: CategoryType;
  priority: CategoryPriorityType;
  activity: ActivityType;
  history: IHistoryLog[];
}