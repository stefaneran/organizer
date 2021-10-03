import getNameOptions from 'inventory/utils/getNameOptions';
import { mockAllItems } from '@core/mocks/mockInventory';

describe('getNameOptions', () => {

  it('handles case with no missing items', () => {
    const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const result = getNameOptions(mockAllItems, input);
    const expectedOutput = [];
    expect(result).toEqual(expectedOutput);
  })

  it('handles case with one missing item', () => {
    const input = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const result = getNameOptions(mockAllItems, input);
    const expectedOutput = [{
      label: 'Spaghetti',
      value: '1'
    }]
    expect(result).toEqual(expectedOutput);
  })

  it('handles case with several missing items and sorts', () => {
    const input = ['4', '5', '6', '7', '8', '9', '10', '11'];
    const result = getNameOptions(mockAllItems, input);
    const expectedOutput = [
      {
        label: 'Ground Beef',
        value: '2'
      },
      {
        label: 'Oregano',
        value: '3'
      },
      {
        label: 'Spaghetti',
        value: '1'
      }
    ]
    expect(result).toEqual(expectedOutput);
  })

})