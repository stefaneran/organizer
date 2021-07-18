import getCategoryOptions from 'inventory/utils/getCategoryOptions';
import { mockAllItems } from '@core/mocks/mockInventory';

describe('getCategoryOptions', () => {

  it('handles case with empty input', () => {
    const input = '';
    const result = getCategoryOptions(input, mockAllItems);
    const expectedOutput = ['Condiments', 'Cooking', 'Grains', 'Meat', 'Pasta'];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with lowercase input "meat"', () => {
    const input = 'meat';
    const result = getCategoryOptions(input, mockAllItems);
    const expectedOutput = ['Meat'];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with capitalized input "Meat"', () => {
    const input = 'Meat';
    const result = getCategoryOptions(input, mockAllItems);
    const expectedOutput = ['Meat'];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with uppercase input "MEAT"', () => {
    const input = 'MEAT';
    const result = getCategoryOptions(input, mockAllItems);
    const expectedOutput = ['Meat'];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with input "co"', () => {
    const input = 'co';
    const result = getCategoryOptions(input, mockAllItems);
    const expectedOutput = ['Condiments', 'Cooking'];
    expect(result).toEqual(expectedOutput);
  });

  it('handles case with input "in"', () => {
    const input = 'in';
    const result = getCategoryOptions(input, mockAllItems);
    const expectedOutput = ['Cooking', 'Grains'];
    expect(result).toEqual(expectedOutput);
  });

})