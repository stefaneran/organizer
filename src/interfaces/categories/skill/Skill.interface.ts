import { ICategory } from '@interfaces/categories';

export interface ISkillCategory extends ICategory {
  items: any[]; 
  archive: any[];
  totalHours: number;
  totalXP: number;
}

export enum SkillItemType {
  Book = "Book",
  Course = "Course",
  Project = "Project"
}

export interface ISkillItem {
  itemType: SkillItemType;
  title: string;
  totalXP: number;
  dateCreated: number;
  lastActivity: number;
}