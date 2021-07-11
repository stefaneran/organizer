import getActivityLocation from '../utils/getActivityLocation';
import mockActivities from './mockActivities';

const unitTests = [
  {
    input: { id: '1', index: 0 },
    output: { name: 'N/A', address: '' }
  },
  {
    input: { id: '1', index: 1 },
    output: { name: 'The Jive', address: '22nd AppleDrive' }
  },
  {
    input: { id: '1', index: 2 },
    output: { name: 'The Red Crow', address: '10th Avenue' }
  },
  {
    input: { id: '1', index: 3 },
    output: { name: 'Crosspoint', address: 'Corner of 10th and 8th ave' }
  }
]

test('getActivityLocation Works', () => {
  for (const unitTest of unitTests) {
    const result = getActivityLocation(mockActivities, unitTest.input.id, unitTest.input.index);
    expect(result).toEqual(unitTest.output);
  }
})