import { Recipe } from 'recipes/types';

// Checks missing ingredients for whole recipe
const checkMissingItemsRecipe = (
  recipe: Recipe,
  availableItems: string[]
): boolean => {
  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const { itemId, isOptional } = recipe.ingredients[i];
    if (!availableItems.includes(itemId) && !isOptional) {
      return true;
    }
  }
  return false;
}

export default checkMissingItemsRecipe;