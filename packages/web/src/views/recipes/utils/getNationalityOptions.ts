import { Recipe } from "recipes/types";

const getNationalityOptions = (recipes: Record<string, Recipe>): string[] => {
  const nationalities: string[] = [];
  const recipeIds = Object.keys(recipes);
  recipeIds.forEach(recipeId => {
    const { nationality } = recipes[recipeId];
    if (!nationalities.includes(nationality)) {
      nationalities.push(nationality);
    }
  })
  return nationalities;
}

export default getNationalityOptions;