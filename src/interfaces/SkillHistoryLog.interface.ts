import { CategoryType } from '@interfaces/general';

export interface SkillHistoryLog {
  // TODO - Remove because it's redundant
  categoryType: CategoryType;
  // Identifier
  // - Skill: Title (string)
  // TODO - Rename to identifier
  categoryIdentifier: string; 
  // Extra info 
  // - Skill: Skill Item type (Book/Course)
  // TODO - Rename for clarity
  subType?: string;
  // Unit of value to represent action
  // - Skill: Hours (number)
  unit?: number; 
  // What is displayed in the log
  title: string;
  description: string;
  activityDate: number; // Timestamp - Formatted to date in UI
}