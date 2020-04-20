import { CategoryType } from '@interfaces/categories';

export interface IHistoryLog {
  categoryType: CategoryType;

  // Identifier
  // Skill: Title (string)
  categoryIdentifier: string; 

  // Unit of value to represent action
  // Skill: Hours (number)
  unit?: number; 

  title: string;
  description: string;
  activityDate: number; // Timestamp
}