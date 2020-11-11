import { ActivityType, PriorityType } from '@core/interfaces/general';

export enum SkillItemType {
  Book = "Book",
  Course = "Course",
  Project = "Project"
}

export interface SkillItem {
  itemType: SkillItemType;
  name: string;
  totalXP: number; // Total XP this item is worth (Time to complete XP + Bonus XP)
  dateCreated: number;
  dateFinished: number;
  lastActivity: number;
  activity: ActivityType;
  priority: PriorityType;
}