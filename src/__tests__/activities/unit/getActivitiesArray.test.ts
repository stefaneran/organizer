import getActivitiesArray from 'activities/utils/getActivitiesArray';
import defaultActivityFilters from 'activities/utils/defaultActivityFilters';
import { ParticipantType } from 'activities/types';
import mockActivities from '@core/mocks/mockActivities';

const mockFilters = [
  { ...defaultActivityFilters, participants: ParticipantType.Alone },
  { ...defaultActivityFilters, participants: ParticipantType.Pair },
  { ...defaultActivityFilters, participants: ParticipantType.Group },
  { ...defaultActivityFilters, name: "game" },
  { ...defaultActivityFilters, name: "GAME" },
];

describe('getActivitiesArray', () => {

  it('handles empty filters', () => {
    const filters = defaultActivityFilters;
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    const expectedLength = 5;
    const expectedNames = ["Bar", "Hiking", "Mexican Food", "Board Game Night", "Game Arcade"];
    expect(result.length).toBe(expectedLength)
    expect(resultNames).toEqual(expectedNames)
  })

  it('handles ParticipantType filter ("Alone")', () => {
    const filters = mockFilters[0];
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    const expectedLength = 3;
    const expectedNames = ["Bar", "Hiking", "Mexican Food"];
    expect(result.length).toBe(expectedLength)
    expect(resultNames).toEqual(expectedNames)
  })

  it('handles ParticipantType filter ("Pair")', () => {
    const filters = mockFilters[1];
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    const expectedLength = 4;
    const expectedNames = ["Bar", "Hiking", "Mexican Food", "Game Arcade"];
    expect(result.length).toBe(expectedLength)
    expect(resultNames).toEqual(expectedNames)
  })

  it('handles ParticipantType filter ("Group")', () => {
    const filters = mockFilters[2];
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    const expectedLength = 2;
    const expectedNames = ["Board Game Night", "Game Arcade"] ;
    expect(result.length).toBe(expectedLength)
    expect(resultNames).toEqual(expectedNames)
  })

  it('handles lower-case name filter ("game")', () => {
    const filters = mockFilters[3];
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    const expectedLength = 2;
    const expectedNames = ["Board Game Night", "Game Arcade"];
    expect(result.length).toBe(expectedLength)
    expect(resultNames).toEqual(expectedNames)
  })

  it('handles upper-case name filter ("game")', () => {
    const filters = mockFilters[4];
    const result = getActivitiesArray(mockActivities, filters);
    const resultNames = result.map(activity => activity.name);
    const expectedLength = 2;
    const expectedNames = ["Board Game Night", "Game Arcade"];
    expect(result.length).toBe(expectedLength)
    expect(resultNames).toEqual(expectedNames)
  })

})