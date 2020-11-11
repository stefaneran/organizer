import { PriorityType, ActivityType } from '@core/interfaces/general';
import { SkillHistoryLog } from '@skills/interfaces/SkillHistoryLog.interface';

export interface Skill {
  name: string;
  lastActivity: number;
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
  name: '',
  lastActivity: Date.now(),
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