import { ActivityType } from '@activities/types';

export default (activities, activityType: ActivityType) => {
  const matches = [];
  for (const id in activities) {
    const activity = activities[id];
    if (activity.activityType === activityType) {
      matches.push({ label: activity.name, value: id });
    }
  }
  return matches;
}