import { Recipe } from 'recipes/types';

const getCategoryOptions = (recipes: Record<string, Recipe>): string[] => {
  const categories: string[] = [];
  const recipeIds = Object.keys(recipes);
  recipeIds.map(recipeId => {
    const { category } = recipes[recipeId];
    if (!categories.includes(category)) {
      categories.push(category);
    }
  })
  return categories;
}

export default getCategoryOptions;