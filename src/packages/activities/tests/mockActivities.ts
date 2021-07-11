import { Activity, ActivityType, ParticipantType } from '../types';

const mockActivities: Record<string, Activity> = {
  '1': {
    id: '1',
    name: 'Bar',
    locations: [],
    activityType: ActivityType.Drinks,
    participantType: [ParticipantType.Pair, ParticipantType.Alone]
  },
  '2': {
    id: '2',
    name: 'Hiking',
    locations: [],
    activityType: ActivityType.Fitness,
    participantType: [ParticipantType.Pair, ParticipantType.Alone]
  },
  '3': {
    id: '3',
    name: 'Board Game Night',
    locations: [],
    activityType: ActivityType.Games,
    participantType: [ParticipantType.Group]
  },
  '4': {
    id: '4',
    name: 'Game Arcade',
    locations: [],
    activityType: ActivityType.Games,
    participantType: [ParticipantType.Pair, ParticipantType.Group]
  },
  '5': {
    id: '5',
    name: 'Mexican Food',
    locations: [],
    activityType: ActivityType.Food,
    participantType: [ParticipantType.Pair, ParticipantType.Alone]
  }
}

export default mockActivities;