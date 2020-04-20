import { CategoryType } from '@interfaces/categories';

export interface IHistoryLog {
  categoryType: CategoryType;
  title: string;
  description: string;
  activityDate: number; // Timestamp
}