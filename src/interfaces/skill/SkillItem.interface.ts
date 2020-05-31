import { ActivityType, PriorityType } from '@interfaces/general';

export enum SkillItemType {
  Book = "Book",
  Course = "Course",
  Project = "Project"
}

export interface SkillItem {
  itemType: SkillItemType;
  title: string;
  description: string;
  totalXP: number; // Total XP this item is worth (Time to complete XP + Bonus XP)
  dateCreated: number;
  dateFinished: number;
  lastActivity: number;
  activity: ActivityType;
  priority: PriorityType;
}