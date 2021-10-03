import { Event } from 'contacts/types';

const oneUnixDay = 60 * 60 * 24 * 1000;

const daysAgo = (days) => Date.now() - (days * oneUnixDay);

const mockEvents: Record<string, Event> = {
  '1': {
    id: '1',
    title: '',
    participants: ['2', '4'],
    activityId: '',
    activityLocationIndex: 0,
    date: daysAgo(3)
  },
  '2': {
    id: '2',
    title: 'Work Teambuilding',
    participants: ['1'],
    activityId: '',
    activityLocationIndex: 0,
    date: daysAgo(-5)
  },
  '3': {
    id: '3',
    title: 'John\'s Birthday Party',
    participants: ['1', '2', '3', '4'],
    activityId: '',
    activityLocationIndex: 0,
    date: daysAgo(-8)
  },
  '4': {
    id: '4',
    title: 'Catch up with Nick from work',
    participants: ['2'],
    activityId: '',
    activityLocationIndex: 0,
    date: daysAgo(12)
  },
}

export default mockEvents;