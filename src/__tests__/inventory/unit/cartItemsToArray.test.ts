import cartItemsToArray from 'inventory/utils/cartItemsToArray';
import { mockAllItems } from '@core/mocks/mockInventory';

const unitTests = [
  {
    input: [],
    output: []
  },
  {
    input: ['3'],
    output: [
      { id: '3', name: 'Oregano', category: 'Cooking' }
    ]
  },
  {
    input: ['3', '7'],
    output: [
      { id: '3', name: 'Oregano', category: 'Cooking' },
      { id: '7', name: 'Bread', category: 'Grains' }
    ]
  }
]

test('cartItemsToArray', () => {
  for (const unitTest of unitTests) {
    const result = cartItemsToArray(unitTest.input, mockAllItems);
    expect(result).toEqual(unitTest.output);
  }
})