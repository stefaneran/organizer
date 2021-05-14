import ActivityLocation from '@activities/interfaces/ActivityLocation.interface';

export default (activities, activityId): ActivityLocation[] => {
  const activity = activities[activityId];
  if (activity) {
    return activity.locations;
  }
  return [];
}