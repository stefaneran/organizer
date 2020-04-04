import { XP_RANKS } from './skill.constants';

// To get a Select input compatible rank options array
export const getRankOptions = () => 
  XP_RANKS.map(rank => ({ label: rank.title, value: rank.rank }));

export const getSkillRank = (xp) => {
  const [xpRank] = XP_RANKS.filter(rank => (rank.min >= xp && rank.max < xp));
  return xpRank;
}

// Action: Add skill and return potential XP
// - Calc time to finish
// - Calc hour value
// - Calc total XP
export const supplementTimeToFinish = (numOfUnits: number, unitHourValue?: number) => 
  unitHourValue ? numOfUnits * unitHourValue : 1;
export const supplementHourValue = (timeToFinish: number): number => 
  timeToFinish / 3;
export const supplementTotalXP = (timeToFinish, addedHourValue) => 
  (timeToFinish + addedHourValue) * 100


