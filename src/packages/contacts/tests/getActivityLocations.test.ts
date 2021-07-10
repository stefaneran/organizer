import getActivityLocations from '../utils/getActivityLocations';

const activities = {
  '0': {
    locations: []
  },
  '2': {
    locations: [{}, {}]
  },
  '3': {
    locations: [{}, {}, {}]
  }
}

test('getActivityLocations Works', () => {
  for (const id in activities) {
    const locations = getActivityLocations(activities, id);
    expect(locations.length).toEqual(Number(id));
  }
});