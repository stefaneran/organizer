import { Activity, ActivityFilters } from "activities/types";

const getActivitiesArray = (
  activities: Record<string, Activity>, 
  filters: ActivityFilters
): Activity[] => {
  const { name, participants } = filters;
  let filteredActivities = Object.entries(activities).map(([id, activity]) => ({ 
    ...activity,
    id
  }))
  if (name.length) {
    filteredActivities = filteredActivities.filter(activity => 
      activity.name.toLowerCase().includes(name.toLowerCase())
    )
  }
  if (participants !== 'All') {
    filteredActivities = filteredActivities.filter(activity => 
      activity.participantType.includes(participants)
    )
  }
  return filteredActivities;
}

export default getActivitiesArray;