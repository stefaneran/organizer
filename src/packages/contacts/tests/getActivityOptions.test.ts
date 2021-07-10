import getActivityOptions from '../utils/getActivityOptions';
import { ActivityType } from '@activities/types';

const mockActivities = {
  '0': { name: 'test', activityType: ActivityType.Entertainment },
  '1': { name: 'test', activityType: ActivityType.Fitness },
  '2': { name: 'test', activityType: ActivityType.Fitness },
  '3': { name: 'test', activityType: ActivityType.Games },
  '4': { name: 'test', activityType: ActivityType.Games },
  '5': { name: 'test', activityType: ActivityType.Games },
  '6': { name: 'test', activityType: ActivityType.Sport },
  '7': { name: 'test', activityType: ActivityType.Sport },
  '8': { name: 'test', activityType: ActivityType.Sport },
  '9': { name: 'test', activityType: ActivityType.Sport }
}

const unitTests = [
  { input: ActivityType.Trip, output: 0 },
  { input: ActivityType.Entertainment, output: 1 },
  { input: ActivityType.Fitness, output: 2 },
  { input: ActivityType.Games, output: 3 },
  { input: ActivityType.Sport, output: 4 }
]

test('getActivityOptions Works', () => {
  for (const unitTest of unitTests) {
    const matches = getActivityOptions(mockActivities, unitTest.input);
    expect(matches.length).toEqual(unitTest.output);
  }
});