import cartItemsToArray from 'inventory/utils/cartItemsToArray';
import { mockAllItems } from '@core/mocks/mockInventory';

describe('cartItemsToArray', () => {

  it('handles empty case', () => {
    const input = [];
    const result = cartItemsToArray(input, mockAllItems);
    const expectedOutput = [];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with one item', () => {
    const input = ['3'];
    const result = cartItemsToArray(input, mockAllItems);
    const expectedOutput = [{ id: '3', name: 'Oregano', category: 'Cooking' }];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with several item', () => {
    const input = ['3', '7'];
    const result = cartItemsToArray(input, mockAllItems);
    const expectedOutput = [
      { id: '3', name: 'Oregano', category: 'Cooking' },
      { id: '7', name: 'Bread', category: 'Grains' }
    ];
    expect(result).toEqual(expectedOutput);
  });

})