import getActivityLocations from '../utils/getActivityLocations';
import { Activity } from '../types';

const activities = {
  '0': { locations: [] } as Activity,
  '2': { locations: [{}, {}] } as Activity,
  '3': { locations: [{}, {}, {}] } as Activity
}

test('getActivityLocations Works', () => {
  for (const id in activities) {
    const locations = getActivityLocations(activities, id);
    expect(locations.length).toEqual(Number(id));
  }
});