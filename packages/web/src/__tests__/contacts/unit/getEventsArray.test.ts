import getEventsArray from 'contacts/utils/getEventsArray';
import defaultEventFilters from 'contacts/utils/defaultEventFilters';
import mockEvents from '@core/mocks/mockEvents';

const mockFilters = [
  { ...defaultEventFilters, title: 'bir' },
  { ...defaultEventFilters, title: 'ork' },
  { ...defaultEventFilters, title: 'wor' }
];

const unitTests = [
  // Default filter
  { 
    input: defaultEventFilters,
    output: { 
      length: 2, 
      titles: ["Work Teambuilding", "John's Birthday Party"] 
    }
  },
  // Past events
  {
    input: mockFilters[0],
    output: { 
      length: 2, 
      titles: ["", "Catch up with Nick from work"] 
    }
  },
  // By title ("bir")
  {
    input: mockFilters[1],
    output: { 
      length: 1, 
      titles: ["John's Birthday Party"] 
    }
  },
  // By title ("ork")
  {
    input: mockFilters[2],
    output: { 
      length: 1, 
      titles: ["Work Teambuilding"] 
    }
  },
  // By title ("wor") and in past
  {
    input: mockFilters[3],
    output: { 
      length: 1, 
      titles: ["Catch up with Nick from work"] 
    }
  }
]

test('getEventsArray', () => {
  for (const unitTest of unitTests) {
    const filters = unitTest.input;
    const result = getEventsArray(mockEvents, filters);
    const resultTitles = result.map(event => event.title);
    expect(result.length).toBe(unitTest.output.length)
    expect(resultTitles).toEqual(unitTest.output.titles)
  }
});