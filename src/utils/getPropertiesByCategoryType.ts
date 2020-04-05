import { CategoryType } from '@interfaces/categories';
import { XP_PER_HOUR } from '@logic/skill.constants';
import { getRankInfoByRankNum } from '@logic/skill.logic';

export default (payload) => {
  const type = payload.categoryType;
  const map = {
    [CategoryType.Skill]: getSkillProperties(payload)
  }
  return map[type];
}

const getSkillProperties = (payload) => {

  const rank = getRankInfoByRankNum(payload.rank);

  const totalHours = (rank.min - 1) / XP_PER_HOUR;
  const totalXP = rank.min - 1;

  return {
    items: [],
    archive: [],
    // Will get a negative number if lowest level
    totalHours: totalHours < 0 ? 0 : totalHours,
    totalXP: totalXP < 0 ? 0 : totalXP
  }
}