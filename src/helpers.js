import { mockUsers } from './mockData.js';

export function getUserName(userId) {
  const user = mockUsers.find((u) => u.userId === userId);
  if (user) {
    return `${user.firstName} ${user.lastName}`;
  } else {
    console.error(`User with userId ${userId} not found in mockUsers`);
    return '';
  }
}

export function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
}

export function getDateAndTime(datetimeString) {
  const date = formatDate(datetimeString.split('T')[0]);
  const time = datetimeString.split('T')[1];
  return [date, time];
}
