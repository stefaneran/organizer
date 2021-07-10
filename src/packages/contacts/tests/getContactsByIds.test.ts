import getContactsByIds from '../utils/getContactsByIds';
import mockContacts from './mockContacts';

const unitTests = [
  { 
    input: ['1', '3'],
    output: [
      { ...mockContacts['1'], id: '1' },
      { ...mockContacts['3'], id: '3' },
    ]
  },
  {
    input: ['2', '5', '6'],
    output: [
      { ...mockContacts['2'], id: '2' },
      { ...mockContacts['5'], id: '5' },
      { ...mockContacts['6'], id: '6' },
    ]
  },
  {
    input: ['4'],
    output: [ {...mockContacts['4'], id: '4'} ]
  },
  {
    input: [],
    output: []
  }
]

test('getContactsByIds Works', () => {
  for (const unitTest of unitTests) {
    let result = getContactsByIds(mockContacts, unitTest.input);
    expect(result).toEqual(unitTest.output);
  }
})
