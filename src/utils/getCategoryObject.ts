import getPropertiesByCategoryType from '@utils/getPropertiesByCategoryType';

// TODO - Add other category interfaces
export default (payload) => {
  const categoryProperties = getPropertiesByCategoryType(payload);
  const { title, description, categoryType, priority } = payload;
  return {
    title,
    description,
    categoryType,
    priority,
    ...categoryProperties
  };
}