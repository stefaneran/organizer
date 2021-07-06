import { Recipe, RecipeFilters } from '@recipes/types';
import genericSort from '@core/utils/genericSort';

const getRecipesArray = (
  recipes: Record<string, Recipe>, 
  recipeFilters: RecipeFilters
): Recipe[] => {
  
  let filteredRecipes: Recipe[] = [];
  const recipeIds = Object.keys(recipes);
  const { nationality, category, name } = recipeFilters;

  recipeIds.forEach(recipeId => {
    const recipe = recipes[recipeId];

    const passesNationality = 
      nationality === 'All' || 
      (nationality !== 'All' && recipe.nationality === nationality);

    const passedCategory = 
      category === 'All' ||
      (category !== 'All' && recipe.category === category);

    const passesNameFilter = 
      name === '' ||
      (name.length && recipe.name.toLowerCase().includes(name.toLowerCase()));

    if (passesNationality && passedCategory && passesNameFilter) {
      filteredRecipes.push({
        ...recipe,
        id: recipeId
      });
    }
  })
  return filteredRecipes.sort((a, b) => genericSort(a.name, b.name));
}

export default getRecipesArray;