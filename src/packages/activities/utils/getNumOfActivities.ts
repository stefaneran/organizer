import { ActivityType, Activity } from 'activities/types';

// TODO Unit Test
const getNumOfActivities = (
  activities: Record<string, Activity>,
  activityType: ActivityType
): number => {
  let count = 0;
  Object.entries(activities).forEach(([,activity]) => {
    if (activity.activityType === activityType)
      count += 1;
  })
  return count;
}

export default getNumOfActivities;