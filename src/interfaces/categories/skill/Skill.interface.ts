import { ICategory } from '@interfaces/categories';

export interface ISkillCategory extends ICategory {
  items: any[]; 
}

export enum SkillItemTypes {
  Book = "Book",
  Course = "Course"
}

export interface ISkillItem {
  title: string;
  total_xp: number;
  date_started: number;
  date_ended: number;
}