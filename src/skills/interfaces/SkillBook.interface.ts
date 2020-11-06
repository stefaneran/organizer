import { SkillItem } from '@interfaces/skill/SkillItem.interface';

export interface SkillBook extends SkillItem {
  author?: string;
  pagesTotal: number;
  pagesRead: number;
}