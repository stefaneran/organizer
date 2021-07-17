import availableItemsToArray from 'inventory/utils/availableItemsToArray';
import { mockAllItems } from '@core/mocks/mockInventory';

const unitTests = [
  {
    input: {
      items: [],
      textFilter: ''
    },
    output: []
  },
  {
    input: {
      items: ['1', '2', '3'],
      textFilter: 'wine'
    },
    output: []
  },
  {
    input: {
      items: Object.keys(mockAllItems).map(id => id),
      textFilter: ''
    },
    output: Object.keys(mockAllItems).map(id => ({ id, ...mockAllItems[id] }))
  },
  {
    input: {
      items: ['1','2'],
      textFilter: ''
    },
    output: [
      { id: '1', name: 'Spaghetti', category: 'Pasta' },
      { id: '2', name: 'Ground Beef', category: 'Meat' }
    ]
  },
  {
    input: {
      items: ['1','2'],
      textFilter: 'beef'
    },
    output: [
      { id: '2', name: 'Ground Beef', category: 'Meat' }
    ]
  },
]

test('availableItemsToArray', () => {
  for (const unitTest of unitTests) {
    const result = availableItemsToArray({ 
      availableItems: unitTest.input.items,
      allItems: mockAllItems, 
      textFilter: unitTest.input.textFilter 
    });
    expect(result).toEqual(unitTest.output);
  }
})