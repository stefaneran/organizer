// import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';

export const getCategories = ({ profiles, currentProfile }) => 
  profiles[currentProfile].categories;


export const getCategoryByTitle = ({profiles, currentProfile}, title) => {
  const categories = getCategories({ profiles, currentProfile });
  return categories.find(category => category.title === title);
}

export const getCategoryIndexByTitle = ({profiles, currentProfile}, title) => {
  const categories = getCategories({ profiles, currentProfile });
  let index = 0;
  for(let i = 0; i < categories.length; i += 1) {
    if(categories[i].title === title) {
      index = i;
      break;
    }
  }
  return index;
}