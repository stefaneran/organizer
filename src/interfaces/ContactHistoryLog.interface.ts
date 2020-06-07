import InteractionType from '@interfaces/contacts/InteractionType.interface';

export interface ContactHistoryLog {
  type: InteractionType;
  // Timestamp - Formatted to date in UI
  activityDate: number; 
}