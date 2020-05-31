import { PriorityType, CategoryType, ActivityType } from '@interfaces/general';
import { HistoryLog } from '@interfaces/HistoryLog.interface';

export interface Skill {
  title: string;
  description: string;
  lastActivity: number;
  categoryType: CategoryType;
  priority: PriorityType;
  activity: ActivityType;
  history: HistoryLog[];
  items: any[]; 
  archive: any[];
  totalHours: number;
  totalXP: number;
  weekHourGoal: number;
  notes: string;
}

// Used in validation
export const skillModel: Skill = {
  title: '',
  description: '',
  lastActivity: Date.now(),
  categoryType: CategoryType.Skill,
  priority: PriorityType.Low,
  activity: ActivityType.Active,
  history: [],
  items: [],
  archive: [],
  totalHours: 0,
  totalXP: 0,
  weekHourGoal: 0,
  notes: ''
}