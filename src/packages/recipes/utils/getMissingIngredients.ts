import { Recipe } from '@recipes/types';

const getMissingIngredients = (
  ingredients: Recipe["ingredients"],
  availableItems: string[],
  cart: string[]
): string[] => {
  const missing: string[] = [];
  // Scan all ingredients for only the missing ones
  ingredients.forEach(ingredient => {
    const { itemId, isOptional } = ingredient;
    const shouldAdd = !availableItems.includes(itemId) && !cart.includes(itemId) && !isOptional;
    if (shouldAdd) {
      missing.push(itemId)
    }
  });
  return missing;
}

export default getMissingIngredients