import { ActivityType } from '@core/interfaces/general';
import { SkillItemType } from '@skills/interfaces/SkillItem.interface';
import { XP_PER_HOUR, SKILL_ITEM_XP_MODIFIER } from '@skills/constants';

const calculateBookTotalXP = (formData) => {
  const { pagesTotal } = formData;
  const totalHours = Math.ceil((pagesTotal * 2) / 60);
  const totalXP = (totalHours * XP_PER_HOUR) * SKILL_ITEM_XP_MODIFIER;
  return totalXP;
}

const calculateCourseTotalXP = (formData) => {
  const { classesTotal, hoursPerClass } = formData;
  const totalHours = classesTotal * hoursPerClass;
  const totalXP = (totalHours * XP_PER_HOUR) * SKILL_ITEM_XP_MODIFIER;
  return totalXP;
}

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
    history: [],
    totalXP: calculateBookTotalXP(formData)
  })

// ISkillCourse
const getCourseProperties = (formData) => ({
    classesTotal: formData.classesTotal,
    classesDone: formData.classesDone || 0,
    hoursPerClass: formData.hoursPerClass,
    history: [],
    totalXP: calculateCourseTotalXP(formData)
  });

export default (itemType, formData) => {
  const skillItemProperties = getPropertiesBySkillItemType(itemType, formData);
  const { name, priority } = formData;
  return {
    itemType,
    name,
    activity: ActivityType.Active,
    priority,
    dateCreated: Date.now(),
    dateFinished: undefined,
    lastActivity: Date.now(),
    ...skillItemProperties
  };
}