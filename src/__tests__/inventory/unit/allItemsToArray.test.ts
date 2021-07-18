import allItemsToArray from 'inventory/utils/allItemsToArray';
import { mockAllItems } from '@core/mocks/mockInventory';

const unitTests = [
  {
    input: '',
    output: Object.entries(mockAllItems).map(([id, item]) => ({ id, ...item }))
  },
  {
    input: 'oregano',
    output: [{ id: '3', name: 'Oregano', category: 'Cooking' }]
  },
  {
    input: 'read',
    output: [{ id: '7', name: 'Bread', category: 'Grains' }]
  },
  {
    input: 'beer',
    output: []
  }
]

describe('allItemsToArray', () => {

  it('should return full set with empty filter', () => {
    const input = '';
    const result = allItemsToArray({ 
      allItems: {
        '1': mockAllItems['1'],
        '2': mockAllItems['2']
      },
      textFilter: input 
    });
    const expectedOutput = [
      { id: '1', name: 'Spaghetti', category: 'Pasta' },
      { id: '2', name: 'Ground Beef', category: 'Meat' }
    ];
    expect(result).toEqual(expectedOutput);
  })

  it('should return correct result with matching filter', () => {
    const input = 'oregano';
    const result = allItemsToArray({ 
      allItems: mockAllItems,
      textFilter: input 
    });
    const expectedOutput = [
      { id: '3', name: 'Oregano', category: 'Cooking' }
    ];
    expect(result).toEqual(expectedOutput);
  })

  it('should return empty set with non-matching filter', () => {
    const input = 'beer';
    const result = allItemsToArray({ 
      allItems: mockAllItems,
      textFilter: input 
    });
    const expectedOutput = [];
    expect(result).toEqual(expectedOutput);
  })

})