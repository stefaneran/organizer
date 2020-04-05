import { ISkillItem } from '@interfaces/categories/skill/Skill.interface';
import { IHistoryLog } from '@interfaces/history';

export interface ISkillBook extends ISkillItem {
  author?: string;
  pages_total: number;
  pages_read: number;
  history: IBookHistoryLog[];
}

export interface IBookHistoryLog extends IHistoryLog {
  pages_read: number;
  date: number;
}