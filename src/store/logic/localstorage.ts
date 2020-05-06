
export const saveToLocalStorage = (profiles) => {
  try {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  } catch(e) {
    return false; // TODO - Return message for notification
  }
  return true;
}

export const loadFromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem('profiles'));
    return data;
  } catch(e) {
    return false; // TODO - Return message for notification
  }
}