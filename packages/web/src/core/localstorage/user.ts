import { UserData } from '@core/types';

export const saveUserToLocalStorage = (userName, password): void => {
  localStorage.setItem('user', JSON.stringify({ userName, password }));
}

export const loadUserFromLocalStorage = (): UserData | false => {
  const userRawData = localStorage.getItem('user');
  if (userRawData) {
    const user = JSON.parse(userRawData);
    return user
  }
  return false;
}