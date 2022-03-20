import { Recipe } from 'recipes/types';

// Checks missing ingredients for whole recipe
const checkMissingItemsRecipe = (
  recipe: Recipe,
  inventory: string[]
): boolean => {
  for (const ingredient of recipe.ingredients) {
    const { itemId, isOptional, alternatives } = ingredient;
    if (!inventory.includes(itemId) && !isOptional) {
      // If missing ingredient has alternative
      if (alternatives) {
        let hasAvailableAlternative = false;
        for (const alternative of alternatives) {
          if (inventory.includes(alternative.itemId)) {
            hasAvailableAlternative = true;
          }
        }
        if (hasAvailableAlternative) {
          continue;
        }
      }
      return true;
    }
  }
  return false;
}

export default checkMissingItemsRecipe;