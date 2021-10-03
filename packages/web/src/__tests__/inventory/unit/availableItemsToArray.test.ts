import availableItemsToArray from 'inventory/utils/availableItemsToArray';
import { mockAllItems } from '@core/mocks/mockInventory';

describe('availableItemsToArray', () => {

  it('should return no results for empty set and empty filter', () => {
    const input = {
      items: [],
      textFilter: ''
    }
    const result = availableItemsToArray({ 
      availableItems: input.items,
      allItems: mockAllItems, 
      textFilter: input.textFilter 
    });
    const expectedOutput = [];
    expect(result).toEqual(expectedOutput);
  })

  it('should return no results for non-matching filter', () => {
    const input = {
      items: ['1', '2', '3'],
      textFilter: 'wine'
    }
    const result = availableItemsToArray({ 
      availableItems: input.items,
      allItems: mockAllItems, 
      textFilter: input.textFilter 
    });
    const expectedOutput = [];
    expect(result).toEqual(expectedOutput);
  })

  it('should return full set with empty filter', () => {
    const input = {
      items: ['1', '2'],
      textFilter: ''
    }
    const result = availableItemsToArray({ 
      availableItems: input.items,
      allItems: mockAllItems, 
      textFilter: input.textFilter 
    });
    const expectedOutput = [
      { id: '1', name: 'Spaghetti', category: 'Pasta' },
      { id: '2', name: 'Ground Beef', category: 'Meat' }
    ]
    expect(result).toEqual(expectedOutput);
  })

  it('should return matching items with matching filter', () => {
    const input = {
      items: ['1','2'],
      textFilter: 'beef'
    }
    const result = availableItemsToArray({ 
      availableItems: input.items,
      allItems: mockAllItems, 
      textFilter: input.textFilter 
    });
    const expectedOutput = [
      { id: '2', name: 'Ground Beef', category: 'Meat' }
    ]
    expect(result).toEqual(expectedOutput);
  })

})