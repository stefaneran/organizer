import ActivityType from '@activities/interfaces/ActivityType.enum';

export default (activities, activityType: ActivityType) => {
  const matches = [];
  for (const id of Object.keys(activities)) {
    const activity = activities[id];
    if (activity.activityType === activityType) {
      matches.push({ label: activity.name, value: id });
    }
  }
  return matches;
}