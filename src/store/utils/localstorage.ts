
export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('data', JSON.stringify(data));
  } catch(e) {
    return false; // TODO - Return message for notification
  }
  return true;
}

export const loadFromLocalStorage = () => {
  try {
    let rawData = localStorage.getItem('data');
    let userRawData = localStorage.getItem('user');
    let data, user;
    if(!rawData) {
      rawData = localStorage.getItem('profiles');
      let tempData = JSON.parse(rawData);
      data = {
        skills: tempData.default.categories,
        contacts: []
      }
    } else {
      data = JSON.parse(rawData);
      user = JSON.parse(userRawData);
    }
    return { success: true, data, user };
  } catch(e) {
    return { success: false, user: false }; // TODO - Return message for notification
  }
}

export const loadUserFromLocalStorage = () => {
  const userRawData = localStorage.getItem('user');
  if (userRawData) {
    const user = JSON.parse(userRawData);
    return { success: true, user }
  }
  return { success: false, user: false };
}