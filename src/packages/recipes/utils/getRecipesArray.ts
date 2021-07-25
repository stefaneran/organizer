import { Recipe, RecipeFilters } from 'recipes/types';
import genericSort from '@core/utils/genericSort';
import checkMissingItemsRecipe from 'recipes/utils/checkMissingItemsRecipe';

const getRecipesArray = (
  recipes: Record<string, Recipe>, 
  filters: RecipeFilters,
  availableItems: string[]
): Recipe[] => {

  const recipesArray = Object.entries(recipes).map(([id, recipe]) => ({
    id,
    ...recipe
  }));
  if (!filters) {
    return recipesArray;
  }
  
  let filteredRecipes: Recipe[] = recipesArray;

  if (filters.name.length) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(filters.name.toLowerCase()))
  }
  if (filters.nationality !== "All") {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.nationality === filters.nationality)
  }
  if (filters.category !== "All") {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.category === filters.category);
  }
  if (filters.availableOnly) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const hasMissing = checkMissingItemsRecipe(recipe, availableItems);
      return !hasMissing;
    })
  }

  return filteredRecipes.sort((a, b) => genericSort(a.name, b.name));
}

export default getRecipesArray;