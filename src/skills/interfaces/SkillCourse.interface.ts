import { SkillItem } from '@interfaces/skill/SkillItem.interface';

interface SkillCourse extends SkillItem {
  classesTotal: number;
  classesDone: number;
  hoursPerClass: number;
}

export default SkillCourse;