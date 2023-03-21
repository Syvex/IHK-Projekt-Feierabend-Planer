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
