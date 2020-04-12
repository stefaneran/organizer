import { CategoryType } from '@interfaces/categories';

export interface IHistoryLog {
  categoryType: CategoryType;
  title: string;
  activityDate: number; // Timestamp
}