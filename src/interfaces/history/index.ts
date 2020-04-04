import { CategoryType } from '@interfaces/categories';

export interface IHistoryLog {
  category: CategoryType;
  item: string;
  description: string;
  date_updated: number; // Timestamp
}