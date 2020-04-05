// import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';
import getPropertiesByCategoryType from '@utils/getPropertiesByCategoryType';

export const getCategories = ({ profiles, currentProfile }) => 
  profiles[currentProfile].categories;

// TODO - Add other category interfaces
export const addCategoryAction = ({ profiles, currentProfile }, { payload }) => {
  const categoryProperties = getPropertiesByCategoryType(payload);
  const { title, description, categoryType, priority } = payload;
  profiles[currentProfile].categories.push({
    title,
    description,
    categoryType,
    priority,
    ...categoryProperties
  });
}