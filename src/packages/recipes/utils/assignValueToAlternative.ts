import { Ingredient, IngredientEdit } from '@recipes/types';

// Assigns a value to a property in an alternative ingredient and returns the full new ingredient
const assignValueToAlternative = (
  ingredients: IngredientEdit[],
  index: number, 
  subIndex: number, 
  property: string, 
  value: string
): IngredientEdit => {
  let ingredient: IngredientEdit;
  ingredient = { 
    ...ingredients[index],
    alternatives: [
      ...ingredients[index].alternatives
    ]
  };
  // Assign the value
  ingredient.alternatives[subIndex] = {
    ...ingredient.alternatives[subIndex],
    [property]: value
  }
  return ingredient;
}

export default assignValueToAlternative;