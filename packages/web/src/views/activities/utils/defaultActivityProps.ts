import { Activity, ActivityType } from 'activities/types';

// Empty activity object for creation
const defaultActivity: Activity = {
  id: '',
  name: '',
  activityType: ActivityType.Other,
  activityLocationIndex: 0,
  participantType: [],
  locations: [
    { 
      name: '',
      address: ''
    }
  ]
}

export default defaultActivity;