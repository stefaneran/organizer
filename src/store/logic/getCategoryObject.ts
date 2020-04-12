import getPropertiesByCategoryType from './getPropertiesByCategoryType';
import { ActivityType } from '@interfaces/categories';

// TODO - Add other category interfaces
export default (payload) => {
  const categoryProperties = getPropertiesByCategoryType(payload);
  const { title, description, categoryType, priority } = payload;
  return {
    title,
    description,
    categoryType,
    priority,
    activity: ActivityType.Active,
    lastActivity: Date.now(),
    ...categoryProperties
  };
}