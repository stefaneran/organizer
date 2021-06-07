import { Activity, ActivityFilters } from "@activities/types";

export default (activities: Record<string, Activity>, filters: ActivityFilters) => {
  const { name, participants } = filters;
  let filteredActivities = Object.keys(activities).map(id => ({ 
    ...activities[id],
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