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

export interface ICategory {
  title: string;
  description: string;
  type: CategoryType;
  priority: CategoryPriorityType;
}