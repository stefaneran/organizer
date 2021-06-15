import { Recipe } from '@recipes/types';

const checkRecipeHasItem = (
  recipe: Recipe, 
  itemId: string
): boolean => {
  for (const ingredient of recipe.ingredients) {
    if (ingredient.itemId === itemId) {
      return true;
    }
  }
  return false;
}

export default checkRecipeHasItem;