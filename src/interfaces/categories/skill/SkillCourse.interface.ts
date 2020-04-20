import { ISkillItem } from '@interfaces/categories/skill/Skill.interface';

export interface ISkillCourse extends ISkillItem {
  classesTotal: number;
  classesDone: number;
  hoursPerClass: number;
}