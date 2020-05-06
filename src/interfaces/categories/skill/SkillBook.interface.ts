import { ISkillItem } from '@interfaces/categories/skill/Skill.interface';
import { IHistoryLog } from '@interfaces/history';

export interface ISkillBook extends ISkillItem {
  author?: string;
  pagesTotal: number;
  pagesRead: number;
}