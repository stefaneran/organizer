import { Recipe } from 'recipes/types';

type ReturnType = {
  missingIngredients: string[];
  missingOptionals: Array<{ 
    itemId: string;
    name: string;
  }>;
}

const getMissingIngredients = (
  ingredients: Recipe["ingredients"],
  inventory: string[],
  cart: string[]
): ReturnType => {
  const missingIngredients: string[] = [];
  const missingOptionals = [];
  // Scan all ingredients for only the missing ones
  ingredients.forEach(ingredient => {
    const { name, itemId, isOptional } = ingredient;
    const shouldAdd = !inventory.includes(itemId) && !cart.includes(itemId);
    if (shouldAdd) {
      if (isOptional) {
        missingOptionals.push({ itemId, name })
      } else {
        missingIngredients.push(itemId)
      }
    }
  });
  return {
    missingIngredients,
    missingOptionals
  };
}

export default getMissingIngredients