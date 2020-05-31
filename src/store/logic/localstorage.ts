
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
    console.log('==== DEV Raw: ', rawData)
    let data;
    if(!rawData) {
      rawData = localStorage.getItem('profiles');
      let tempData = JSON.parse(rawData);
      console.log('==== DEV: ', tempData)
      data = {
        skill: tempData.default.categories,
        contacts: []
      }
    } else {
      data = JSON.parse(rawData);
    }
    return data;
  } catch(e) {
    return false; // TODO - Return message for notification
  }
}