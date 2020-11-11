export interface SkillHistoryLog {
  // Identifier (skill ID)
  identifier: string; 
  // Item type (Book or Course) if applicable
  subType?: string;
  // Unit of value to represent action
  unit?: number; 
  // What is displayed in the log
  title: string;
  description: string;
  activityDate: number; // Timestamp - Formatted to date in UI
}