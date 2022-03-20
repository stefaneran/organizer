import { GroceryItemEdit } from 'inventory/types';

export const mockAllItems: Record<string, GroceryItemEdit> = {
  // Spaghetti bolognese ingredients
  '1': {
    name: 'Spaghetti',
    category: 'Pasta'
  },
  '2': {
    name: 'Ground Beef',
    category: 'Meat'
  },
  '3': {
    name: 'Oregano',
    category: 'Cooking'
  },
  // Omelette ingredients
  '4': {
    name: 'Eggs',
    category: 'Meat'
  },
  '5': {
    name: 'Olive oil',
    category: 'Cooking'
  },
  // Sandwich ingredients
  '6': {
    name: 'Salami',
    category: 'Meat'
  },
  '7': {
    name: 'Bread',
    category: 'Grains'
  },
  '8': {
    name: 'Mayo',
    category: 'Condiments'
  },
  // Misc
  '9': {
    name: 'Mustard',
    category: 'Condiments'
  },
  '10': {
    name: 'Tabasco',
    category: 'Condiments'
  },
  '11': {
    name: 'Chicken',
    category: 'Meat'
  }
}

/**
 * Contains:
 * - 2/3 ingredients for Spaghetti Bolognese
 * - 2/2 ingredients for Omelette,
 * - 1/3 ingredients for sandwich 
 */
export const mockAvailable: string[] = ['1', '2', '4', '5', '6'];

export const mockCart: string[] = ['1', '3', '7'];