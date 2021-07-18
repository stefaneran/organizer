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

test('allItemsToArray', () => {
  for (const unitTest of unitTests) {
    const result = allItemsToArray({ 
      allItems: mockAllItems, 
      textFilter: unitTest.input 
    });
    expect(result).toEqual(unitTest.output);
  }
})