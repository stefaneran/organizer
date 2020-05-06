import { ICategory, PriorityType, ActivityType, CategoryType } from '@interfaces/categories';

export interface ISkillCategory extends ICategory {
  items: any[]; 
  archive: any[];
  totalHours: number;
  totalXP: number;
  weekHourGoal: number;
  notes: string;
}

// Used in validation
export const skillModel: ISkillCategory = {
  title: '',
  description: '',
  lastActivity: Date.now(),
  categoryType: CategoryType.Skill,
  priority: PriorityType.Low,
  activity: ActivityType.Active,
  history: [],
  items: [],
  archive: [],
  totalHours: 0,
  totalXP: 0,
  weekHourGoal: 0,
  notes: ''
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