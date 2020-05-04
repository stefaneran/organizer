import { ICategory, PriorityType, ActivityType } from '@interfaces/categories';

export interface ISkillCategory extends ICategory {
  items: any[]; 
  archive: any[];
  totalHours: number;
  totalXP: number;
  weekHourGoal: number;
  notes: string;
}

export enum SkillItemType {
  Book = "Book",
  Course = "Course",
  Project = "Project"
}

export interface ISkillItem {
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