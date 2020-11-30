import { SkillItem } from '@skills/interfaces/SkillItem.interface';

interface SkillCourse extends SkillItem {
  classesTotal: number;
  classesDone: number;
  hoursPerClass: number;
}

export default SkillCourse;