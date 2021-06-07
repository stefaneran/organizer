import { ActivityLocation } from '@activities/types';

export default (activities, activityId): ActivityLocation[] => {
  const activity = activities[activityId];
  if (activity) {
    return activity.locations;
  }
  return [];
}