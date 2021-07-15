import { Activity, ActivityType, ParticipantType } from '@activities/types';

const mockActivities: Record<string, Activity> = {
  '1': {
    id: '1',
    name: 'Bar',
    locations: [
      { name: 'The Jive', address: '22nd AppleDrive' },
      { name: 'The Red Crow', address: '10th Avenue' },
      { name: 'Crosspoint', address: 'Corner of 10th and 8th ave' }
    ],
    activityType: ActivityType.Drinks,
    activityLocationIndex: 0,
    participantType: [ParticipantType.Pair, ParticipantType.Alone]
  },
  '2': {
    id: '2',
    name: 'Hiking',
    locations: [],
    activityType: ActivityType.Fitness,
    activityLocationIndex: 0,
    participantType: [ParticipantType.Pair, ParticipantType.Alone]
  },
  '3': {
    id: '3',
    name: 'Board Game Night',
    locations: [],
    activityType: ActivityType.Games,
    activityLocationIndex: 0,
    participantType: [ParticipantType.Group]
  },
  '4': {
    id: '4',
    name: 'Game Arcade',
    locations: [],
    activityType: ActivityType.Games,
    activityLocationIndex: 0,
    participantType: [ParticipantType.Pair, ParticipantType.Group]
  },
  '5': {
    id: '5',
    name: 'Mexican Food',
    locations: [],
    activityType: ActivityType.Food,
    activityLocationIndex: 0,
    participantType: [ParticipantType.Pair, ParticipantType.Alone]
  }
}

export default mockActivities;