import { ICategory, IHistoryLog } from './general';

// Skill category stuff and logic

interface ISkillCategory extends ICategory {
  name: string;
  items: any[]; 
}

interface ISkillBook {
  title: string;
  author?: string;
  total_xp: number;
  pages_total: number;
  pages_read: number;
  date_started: number;
  date_ended: number;
  history: IBookHistoryLog[];
}

interface IBookHistoryLog extends IHistoryLog {
  pages_read: number;
}