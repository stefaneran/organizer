import { Activity, ActivityType } from '@activities/types';
import { Option } from '@core/types';

const getActivityOptions = (
  activities: Record<string, Activity>, 
  activityType: ActivityType
): Option[] => {
  const matches = [];
  for (const id in activities) {
    const activity = activities[id];
    if (activity.activityType === activityType) {
      matches.push({ label: activity.name, value: id });
    }
  }
  return matches;
}

export default getActivityOptions;