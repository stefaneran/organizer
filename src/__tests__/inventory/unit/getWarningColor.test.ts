import getWarningColor from 'inventory/utils/getWarningColor';
import { warningYellow, warningRed } from 'inventory/constants/warningColor';
import { mockAllItems } from '@core/mocks/mockInventory';

describe('getWarningColor', () => {

  it('handles case of undefined item', () => {
    const input = {
     item: undefined,
     cart: ['1'],
     available: ['2', '3']
    }
    const result = getWarningColor(input.item, input.cart, input.available);
    const expectedOutput = '';
    expect(result).toEqual(expectedOutput);
  })

  it('handles case of missing item in cart', () => {
    const input = {
     item: { id: '1', ...mockAllItems['1'] },
     cart: ['1'],
     available: ['2', '3']
    }
    const result = getWarningColor(input.item, input.cart, input.available);
    const expectedOutput = warningYellow;
    expect(result).toEqual(expectedOutput);
  })

  it('handles case of missing item not in cart', () => {
    const input = {
     item: { id: '1', ...mockAllItems['1'] },
     cart: [],
     available: ['2', '3']
    }
    const result = getWarningColor(input.item, input.cart, input.available);
    const expectedOutput = warningRed;
    expect(result).toEqual(expectedOutput);
  })

})