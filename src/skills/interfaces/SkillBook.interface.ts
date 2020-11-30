import { SkillItem } from '@skills/interfaces/SkillItem.interface';

interface SkillBook extends SkillItem {
  author?: string;
  pagesTotal: number;
  pagesRead: number;
}

export default SkillBook;