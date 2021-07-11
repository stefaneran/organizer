import { Activity, ActivityLocation } from '@activities/types';

const getActivityLocation = (
  activities: Record<string, Activity>, 
  activityId: string, 
  index: number
): ActivityLocation => {
  const none = { name: "N/A", address: "" };
  if (index <= 0) {
    return none;
  }
  // We decrease index by one because in EventInfoEdit we have an additional option "None" at the start
  // so 0 represents "None", and NOT the first array item.
  return activities[activityId]?.locations[index - 1] ?? none;
}

export default getActivityLocation;