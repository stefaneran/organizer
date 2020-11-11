const getAllHistory = (skills) => {
  const history = [];
  Object.keys(skills).forEach(skillId => {
    history.push(...skills[skillId].history);
  });
  // Todo test
  history.sort((a, b) => b.activityDate - a.activityDate);
  return history;
}

export default (skills, limit: number) => {
  const history = getAllHistory(skills);
  const recentHistory = [];
  for(let i = 0; i < limit; i++) {
    const log = history.shift();
    if(log) {
      recentHistory.push(log);
    } else {
      break;
    }
  }
  return recentHistory;
}