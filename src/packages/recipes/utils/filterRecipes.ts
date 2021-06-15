import { Recipe, RecipeFilters } from '@recipes/types';

const filterRecipes = (
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
  return filteredRecipes;
}

export default filterRecipes;