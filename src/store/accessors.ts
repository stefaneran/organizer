
//// ----- Category Accessors ----- ////

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

//// ----- Skill Accessors ----- ////

export const getSkillItemByTitle = ({currentProfile, profiles}, skillTitle, itemTitle) => {
  const category = getCategoryByTitle({currentProfile, profiles}, skillTitle);
  return category.items.find(item => item.title === itemTitle);
}

export const getSkillItemIndexByTitle = ({currentProfile, profiles}, skillTitle, itemTitle) => {
  const category = getCategoryByTitle({currentProfile, profiles}, skillTitle);
  let index = 0;
  for(let i = 0; i < category.items.length; i += 1) {
    if(category.items[i].title === itemTitle) {
      index = i;
      break;
    }
  }
  return index;
}