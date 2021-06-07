
export const saveToLocalStorage = (data: any) => {
  try {
    localStorage.setItem('data', JSON.stringify(data));
  } catch(e) {
    return false;
  }
  return true;
}

export const loadUserFromLocalStorage = () => {
  const userRawData = localStorage.getItem('user');
  if (userRawData) {
    const user = JSON.parse(userRawData);
    return { success: true, user }
  }
  return { success: false, user: false };
}