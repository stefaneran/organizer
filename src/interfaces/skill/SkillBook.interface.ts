import { SkillItem } from '@interfaces/skill/SkillItem.interface';
import { HistoryLog } from '@interfaces/HistoryLog.interface';

export interface ISkillBook extends SkillItem {
  author?: string;
  pagesTotal: number;
  pagesRead: number;
}