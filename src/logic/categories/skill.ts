import { ICategory, IHistoryLog } from './general';

// Skill category stuff and logic

export interface ISkillCategory extends ICategory {
  items: any[]; 
}

export interface ISkillBook {
  title: string;
  author?: string;
  total_xp: number;
  pages_total: number;
  pages_read: number;
  date_started: number;
  date_ended: number;
  history: IBookHistoryLog[];
}

export interface IBookHistoryLog extends IHistoryLog {
  pages_read: number;
}