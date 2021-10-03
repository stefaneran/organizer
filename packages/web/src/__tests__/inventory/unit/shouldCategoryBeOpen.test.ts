import shouldCategoryBeOpen from 'inventory/utils/shouldCategoryBeOpen';
import { mockAllItems } from '@core/mocks/mockInventory';

// Items of the "Meat" category
const listItems = [
  { id: '2', ...mockAllItems['2'] },
  { id: '6', ...mockAllItems['6'] },
  { id: '11', ...mockAllItems['11'] }
]

describe('shouldCategoryBeOpen', () => {

  it('should be open with only a text filter', () => {
    const input = {
      selectedItems: [],
      hasSelection: false,
      textFilter: 'beef'
    }
    const result = shouldCategoryBeOpen(
      listItems, 
      input.selectedItems, 
      input.hasSelection,
      input.textFilter
    );
    const expectedOutput = true;
    expect(result).toEqual(expectedOutput);
  })

  it('should be open with no text filter and with valid selection', () => {
    const input = {
      selectedItems: ['6'],
      hasSelection: true,
      textFilter: ''
    }
    const result = shouldCategoryBeOpen(
      listItems, 
      input.selectedItems, 
      input.hasSelection,
      input.textFilter
    );
    const expectedOutput = true;
    expect(result).toEqual(expectedOutput);
  })

  it('should not be open with no text filter and no selection', () => {
    const input = {
      selectedItems: [],
      hasSelection: false,
      textFilter: ''
    }
    const result = shouldCategoryBeOpen(
      listItems, 
      input.selectedItems, 
      input.hasSelection,
      input.textFilter
    );
    const expectedOutput = false;
    expect(result).toEqual(expectedOutput);
  })

  it('should not be open with no text filter and no valid selection', () => {
    const input = {
      selectedItems: ['4'],
      hasSelection: true,
      textFilter: ''
    }
    const result = shouldCategoryBeOpen(
      listItems, 
      input.selectedItems, 
      input.hasSelection,
      input.textFilter
    );
    const expectedOutput = false;
    expect(result).toEqual(expectedOutput);
  })

})