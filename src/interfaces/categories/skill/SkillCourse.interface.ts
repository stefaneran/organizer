import { ISkillItem } from '@interfaces/categories/skill/Skill.interface';
import { IHistoryLog } from '@interfaces/history';

export interface ISkillCourse extends ISkillItem {
  classesTotal: number;
  classesDone: number;
  hoursPerClass: number;
  history: ICourseHistoryLog[];
}

export interface ICourseHistoryLog extends IHistoryLog {
  coursesDone: number;
}