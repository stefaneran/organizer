import { SkillItem } from '@interfaces/skill/SkillItem.interface';

export interface ISkillCourse extends SkillItem {
  classesTotal: number;
  classesDone: number;
  hoursPerClass: number;
}