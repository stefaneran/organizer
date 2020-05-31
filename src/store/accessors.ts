
//// ----- Category Accessors ----- ////

export const getSkillByTitle = (skills, title) => 
  skills.find(skill => skill.title === title);

export const getSkillIndexByTitle = (skills, title) => {
  let index = 0;
  for(let i = 0; i < skills.length; i += 1) {
    if(skills[i].title === title) {
      index = i;
      break;
    }
  }
  return index;
}

//// ----- Skill Accessors ----- ////

export const getSkillItemByTitle = (skills, skillTitle, itemTitle) => {
  const skill = getSkillByTitle(skills, skillTitle);
  return skill.items.find(item => item.title === itemTitle);
}

export const getSkillItemIndexByTitle = (skills, skillTitle, itemTitle) => {
  const skill = getSkillByTitle(skills, skillTitle);
  let index = 0;
  for(let i = 0; i < skill.items.length; i += 1) {
    if(skill.items[i].title === itemTitle) {
      index = i;
      break;
    }
  }
  return index;
}

//// ----- History Accessors ----- ////

export const getAllHistory = (skills) => {
  const history = [];
  skills.forEach(skill => {
    history.push(...skill.history);
  });
  // Todo test
  history.sort((a, b) => b.activityDate - a.activityDate);
  return history;
}

export const getHistory = (skills, limit) => {
  const history = getAllHistory(skills);
  const shorterHistory = [];
  for(let i = 0; i < limit; i++) {
    const log = history.shift();
    if(log) {
      shorterHistory.push(log);
    } else {
      break;
    }
  }
  return shorterHistory;
}