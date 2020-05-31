import { CategoryType } from '@interfaces/general';

export interface HistoryLog {
  categoryType: CategoryType;
  // Identifier
  // - Skill: Title (string)
  categoryIdentifier: string; 
  // Extra info 
  // - Skill: Skill Item type (Book/Course)
  subType?: string;
  // Unit of value to represent action
  // - Skill: Hours (number)
  unit?: number; 
  // What is displayed in the log
  title: string;
  description: string;
  activityDate: number; // Timestamp - Formatted to date in UI
}