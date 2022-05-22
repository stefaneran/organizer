import { Recipe } from 'recipes/types';

// This returns false if even one missing item is not present in cart - Otherwise returns true always
// Note: We don't really care about this function's return value unless checkMissingItems returns true
const checkMissingInCartRecipe = (
  recipe: Recipe,
  inventory: string[],
  cart: string[]
): boolean => {
  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const { itemId, isOptional, alternatives } = recipe.ingredients[i];
    if (!inventory.includes(itemId) && !cart.includes(itemId) && !isOptional) {
      // If missing ingredient has alternative
      if (alternatives) {
        let hasAlternativeInCart = false;
        for (const alternative of alternatives) {
          if (cart.includes(alternative.itemId)) {
            hasAlternativeInCart = true;
          }
        }
        if (hasAlternativeInCart) {
          continue;
        }
      }
      return false;
    }
  }
  return true;
}

export default checkMissingInCartRecipe;