import { IngredientEdit, AlternativeIngredientEdit } from 'recipes/types';

const isAlternativeIngredient = (
  ingredient: IngredientEdit | AlternativeIngredientEdit
): ingredient is AlternativeIngredientEdit => {
  return !('alternatives' in ingredient);
}

export default isAlternativeIngredient;