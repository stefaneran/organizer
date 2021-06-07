import { Activity, ActivityType } from '@activities/types';

// Empty activity object for creation
const defaultActivity: Omit<Activity, "id"> = {
  name: '',
  activityType: ActivityType.Other,
  participantType: [],
  locations: [
    { 
      name: '',
      address: ''
    }
  ]
}

export default defaultActivity;