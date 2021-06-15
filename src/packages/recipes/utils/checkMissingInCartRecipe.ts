import { Recipe } from '@recipes/types';

// This returns false if even one missing item is not present in cart - Otherwise returns true always
// Note: We don't really care about this function's return value unless checkMissingItems returns true
const checkMissingInCartRecipe = (
  recipe: Recipe, 
  availableItems: string[], 
  cart: string[]
): boolean => {
  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const { itemId } = recipe.ingredients[i];
    if (!availableItems.includes(itemId) && !cart.includes(itemId)) {
      return false;
    }
  }
  return true;
}

export default checkMissingInCartRecipe;