import { ICategory } from '@interfaces/categories';

export interface ISkillCategory extends ICategory {
  items: any[]; 
  archive: any[];
  totalHours: number;
  totalXP: number;
}

export enum SkillItemTypes {
  Book = "Book",
  Course = "Course",
  Project = "Project"
}

export interface ISkillItem {
  title: string;
  total_xp: number;
  date_started: number;
  date_ended: number;
}

export enum SkillItemActivityType {
  Unstarted = "Unstarted",
  Paused = "Paused",
  Neglected = "Neglected",
  Active = "Active"
}