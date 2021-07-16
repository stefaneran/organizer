import { Activity, ActivityLocation } from 'activities/types';

const getActivityLocations = (
  activities: Record<string, Activity>, 
  activityId: string
): ActivityLocation[] => {
  const activity = activities[activityId];
  if (activity) {
    return activity.locations;
  }
  return [];
}

export default getActivityLocations;