import { SkillItem } from '@interfaces/skill/SkillItem.interface';

interface SkillBook extends SkillItem {
  author?: string;
  pagesTotal: number;
  pagesRead: number;
}

export default SkillBook;