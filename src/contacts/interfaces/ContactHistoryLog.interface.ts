import InteractionType from '@contacts/interfaces/InteractionType.interface';

export interface ContactHistoryLog {
  type: InteractionType;
  // Timestamp - Formatted to date in UI
  activityDate: number; 
}