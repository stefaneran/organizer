import { Activity, ActivityType } from "activities/types";

// TODO unit test
const getActivitiesOfType = (
  activities: Record<string, Activity>,
  activityType: ActivityType
) => {
  const activitiesList = 
    Object.entries(activities)
    .filter(([, activity]) => activity.activityType === activityType)
    .map(([id, activity]) => ({ id, ...activity }))
  return activitiesList;
}

export default getActivitiesOfType;