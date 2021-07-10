import getEventsArray from '../utils/getEventsArray';
import defaultEventFilters from '../utils/defaultEventFilters';
import mockEvents from './mockEvents';

const mockFiltersList = [
  { ...defaultEventFilters, showUpcoming: false },
  { ...defaultEventFilters, title: 'bir' },
  { ...defaultEventFilters, title: 'ork' },
  { ...defaultEventFilters, title: 'wor', showUpcoming: false }
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
    input: mockFiltersList[0],
    output: { 
      length: 2, 
      titles: ["", "Catch up with Nick from work"] 
    }
  },
  // By title ("bir")
  {
    input: mockFiltersList[1],
    output: { 
      length: 1, 
      titles: ["John's Birthday Party"] 
    }
  },
  // By title ("ork")
  {
    input: mockFiltersList[2],
    output: { 
      length: 1, 
      titles: ["Work Teambuilding"] 
    }
  },
  // By title ("wor") and in past
  {
    input: mockFiltersList[3],
    output: { 
      length: 1, 
      titles: ["Catch up with Nick from work"] 
    }
  }
]

test('getEventsArray Works', () => {
  for (const unitTest of unitTests) {
    const filters = unitTest.input;
    const result = getEventsArray(mockEvents, filters);
    const resultTitles = result.map(event => event.title);
    expect(result.length).toBe(unitTest.output.length)
    expect(resultTitles).toEqual(unitTest.output.titles)
  }
});