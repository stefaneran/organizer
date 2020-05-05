import { ActivityType } from '@interfaces/categories';
import { CategoryType } from '@interfaces/categories';
import { XP_PER_HOUR } from '@logic/skill.constants';
import { getRankInfoByRankNum } from '@logic/skill.logic';

const getPropertiesByCategoryType = (categoryType, formData) => {
  const map = {
    [CategoryType.Skill]: getSkillProperties(formData)
  }
  return map[categoryType];
}

const getSkillProperties = (formData) => {

  const rank = getRankInfoByRankNum(formData.rank);

  const totalHours = (rank.min - 1) / XP_PER_HOUR;
  const totalXP = rank.min - 1;

  return {
    items: [],
    archive: [],
    // Will get a negative number if lowest level
    totalHours: totalHours < 0 ? 0 : totalHours,
    totalXP: totalXP < 0 ? 0 : totalXP,
    weekHourGoal: formData.weekHourGoal,
    notes: ''
  }
}

export default (categoryType, formData) => {
  const categoryProperties = getPropertiesByCategoryType(categoryType, formData);
  const { title, description, priority } = formData;
  return {
    title,
    description,
    categoryType,
    priority,
    activity: ActivityType.Active,
    lastActivity: Date.now(),
    history: [],
    ...categoryProperties
  };
}