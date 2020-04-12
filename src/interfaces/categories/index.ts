import { IHistoryLog } from "@interfaces/history";

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
  priority: PriorityType;
  activity: ActivityType;
  history: IHistoryLog[];
}