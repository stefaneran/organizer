import { ActivityType } from '@interfaces/categories';
import { SkillItemType } from '@interfaces/categories/skill/Skill.interface';

const getPropertiesBySkillItemType = (itemType, formData) => {
  const map = {
    [SkillItemType.Book]: getBookProperties(formData),
    [SkillItemType.Course]: getCourseProperties(formData)
  }
  return map[itemType];
}

// ISkillBook
const getBookProperties = (formData) => ({
    author: formData.author,
    pagesTotal: formData.pagesTotal,
    pagesRead: formData.pagesRead || 0,
    history: []
  })

// ISkillCourse
const getCourseProperties = (formData) => ({
    classesTotal: formData.classesTotal,
    classesDone: formData.classesDone || 0,
    history: []
  });

  // TODO - Finish and move to skill.logic.ts
const calculateXP = (itemType, data) => {
  return 1000;
}

export default (itemType, formData) => {
  const skillItemProperties = getPropertiesBySkillItemType(itemType, formData);
  const { title, description, priority } = formData;
  return {
    itemType,
    title,
    description,
    activity: ActivityType.Active,
    priority,
    dateCreated: Date.now(),
    dateFinished: null,
    lastActivity: Date.now(),
    totalXP: calculateXP(itemType, {}),
    ...skillItemProperties
  };
}