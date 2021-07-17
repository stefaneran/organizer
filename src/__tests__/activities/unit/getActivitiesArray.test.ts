import getActivitiesArray from 'activities/utils/getActivitiesArray';
import defaultActivityFilters from 'activities/utils/defaultActivityFilters';
import { ParticipantType } from 'activities/types';
import mockActivities from '@core/mocks/mockActivities';

const mockFilters = [
  { ...defaultActivityFilters, participants: ParticipantType.Alone },
  { ...defaultActivityFilters, participants: ParticipantType.Pair },
  { ...defaultActivityFilters, participants: ParticipantType.Group },
  { ...defaultActivityFilters, name: "game" },
  { ...defaultActivityFilters, name: "ar" },
];

const unitTests = [
  { 
    input: defaultActivityFilters,
    output: { 
      length: 5, 
      names: ["Bar", "Hiking", "Board Game Night", "Game Arcade", "Mexican Food"] 
    }
  },
  // By ParticipantType ("Alone")
  { 
    input: mockFilters[0],
    output: { 
      length: 3, 
      names: ["Bar", "Hiking", "Mexican Food"] 
    }
  },
  // By ParticipantType ("Pair")
  { 
    input: mockFilters[1],
    output: { 
      length: 4, 
      names: ["Bar", "Hiking", "Game Arcade", "Mexican Food"] 
    }
  },
  // By ParticipantType ("Group")
  { 
    input: mockFilters[2],
    output: { 
      length: 2, 
      names: ["Board Game Night", "Game Arcade"] 
    }
  },
  // By name ("game")
  { 
    input: mockFilters[3],
    output: { 
      length: 2, 
      names: ["Board Game Night", "Game Arcade"] 
    }
  },
  // By name ("ar")
  { 
    input: mockFilters[4],
    output: { 
      length: 3, 
      names: ["Bar", "Board Game Night", "Game Arcade"] 
    }
  },
]

test('getActivitiesArray', () => {
  for (const unitTest of unitTests) {
    const filters = unitTest.input;
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    expect(result.length).toBe(unitTest.output.length)
    expect(resultNames).toEqual(unitTest.output.names)
  }
})