import { ActivityType, CategoryType } from '@core/interfaces/general';
import { XP_PER_HOUR } from '@skills/constants';
import { getRankInfoByRankNum } from '@skills/utils';

export default (formData) => {
  const { title, description, priority } = formData;

  const rank = getRankInfoByRankNum(formData.rank);
  const totalHours = (rank.min - 1) / XP_PER_HOUR;
  const totalXP = rank.min - 1;

  return {
    title,
    description,
    categoryType: CategoryType.Skills,
    priority,
    activity: ActivityType.Unstarted,
    lastActivity: null,
    history: [],
    items: [],
    archive: [],
    // Will get a negative number if lowest level
    totalHours: totalHours < 0 ? 0 : totalHours,
    totalXP: totalXP < 0 ? 0 : totalXP,
    weekHourGoal: formData.weekHourGoal,
    notes: ''
  };
}