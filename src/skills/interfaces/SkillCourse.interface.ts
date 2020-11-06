import { SkillItem } from '@interfaces/skill/SkillItem.interface';

export interface SkillCourse extends SkillItem {
  classesTotal: number;
  classesDone: number;
  hoursPerClass: number;
}