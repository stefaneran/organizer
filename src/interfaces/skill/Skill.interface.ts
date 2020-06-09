import { PriorityType, CategoryType, ActivityType } from '@interfaces/general';
import { SkillHistoryLog } from '@interfaces/SkillHistoryLog.interface';

export interface Skill {
  title: string;
  description: string;
  lastActivity: number;
  categoryType: CategoryType;
  priority: PriorityType;
  activity: ActivityType;
  history: SkillHistoryLog[];
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
  categoryType: CategoryType.Skills,
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