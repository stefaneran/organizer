import getActivityOptions from 'activities/utils/getActivityOptions';
import { Activity, ActivityType } from 'activities/types';

const mockActivities = {
  '0': { name: 'test', activityType: ActivityType.Entertainment } as Activity,
  '1': { name: 'test', activityType: ActivityType.Fitness } as Activity,
  '2': { name: 'test', activityType: ActivityType.Fitness } as Activity,
  '3': { name: 'test', activityType: ActivityType.Games } as Activity,
  '4': { name: 'test', activityType: ActivityType.Games } as Activity,
  '5': { name: 'test', activityType: ActivityType.Games } as Activity,
  '6': { name: 'test', activityType: ActivityType.Sport } as Activity,
  '7': { name: 'test', activityType: ActivityType.Sport } as Activity,
  '8': { name: 'test', activityType: ActivityType.Sport } as Activity,
  '9': { name: 'test', activityType: ActivityType.Sport } as Activity
}

const unitTests = [
  { input: ActivityType.Trip, output: 0 },
  { input: ActivityType.Entertainment, output: 1 },
  { input: ActivityType.Fitness, output: 2 },
  { input: ActivityType.Games, output: 3 },
  { input: ActivityType.Sport, output: 4 }
]

test('getActivityOptions', () => {
  for (const unitTest of unitTests) {
    const matches = getActivityOptions(mockActivities, unitTest.input);
    expect(matches.length).toEqual(unitTest.output);
  }
});