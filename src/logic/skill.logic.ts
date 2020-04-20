import { XP_RANKS } from './skill.constants';

//// ----- Rank Info -----

// To get a Select input compatible rank options array
export const getRankOptions = () => 
  XP_RANKS.map(rank => ({ label: rank.title, value: rank.rank }));

export const getRankInfoByRankNum = (rankNum) => {
  const [rankInfo] = XP_RANKS.filter(rank => (rank.rank === rankNum));
  return rankInfo;
}
export const getRankByXP = (currentXP) => {
  const [xpRank] = XP_RANKS.filter(rank => (rank.min <= currentXP && rank.max >= currentXP));
  return xpRank;
}
export const getNextRank = (rank) => {
  return XP_RANKS[rank.rank];
}


// Calculate hours spent reading a book by pages
// Will calculate steps of 15/30/45 minutes for precision
export const getHoursFromPages = (pagesRead) => {
  const minutes = pagesRead * 2;
  let hours = Math.round((minutes / 60) * 100) / 100;
  let remainder = hours % 1;
  hours -= remainder;
  if(remainder < 0.25) {
    remainder = 0.25;
  }
  else if(remainder > 0.25 && remainder < 0.50) {
    remainder = 0.50;
  }
  else if(remainder > 0.50 && remainder < 0.75) {
    remainder = 0.75;
  }
  else {
    remainder = 1;
  }
  hours += remainder;
  return hours
}