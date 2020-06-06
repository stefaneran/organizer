import InteractionType from '@interfaces/contacts/InteractionType.interface';

export interface PersonHistoryLog {
  type: InteractionType;
  // Timestamp - Formatted to date in UI
  activityDate: number; 
}