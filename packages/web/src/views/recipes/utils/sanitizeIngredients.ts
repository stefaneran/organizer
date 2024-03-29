import getIngredientIdByName from 'recipes/utils/getIngredientIdByName';
import { Ingredient, IngredientEdit } from 'recipes/types';
import { GroceryItemEdit } from 'inventory/types';

// Maps all ingredients with itemIds - Whether they're existing items or new items that need new ids to be created
// We do this because ingredients in edit mode don't have ids by default
const sanitizeIngredients = async (
  ingredients: IngredientEdit[], 
  groceries: Record<string, GroceryItemEdit>,
  addThunk: (name: string, category: string) => Promise<string>
): Promise<Ingredient[]> => {
  const ingredientsWithId = [];
  // Verify each ingredient and get its existing/newly created itemId
  for (const ingredient of ingredients) {
    const { name, alternatives } = ingredient;
    const alternativesWithId = [];
    if (name.length) {

      // Look up item's ID
      let ingredientItemId = getIngredientIdByName(name, groceries);
      // If no ID exists, create the new item and assign it an ID
      if (!ingredientItemId) {
        ingredientItemId = await addThunk(name, 'Uncategorized');
      }

      // Do the same verification for an ingredient's alternatives
      if (alternatives) {
        for (const alternative of alternatives) {
          const { name } = alternative;
          if (name.length) {

            // Look up item's ID by name
            let ingredientItemId = getIngredientIdByName(name, groceries);
            // If no ID exists, create the new item and assign it an ID
            if (!ingredientItemId) {
              ingredientItemId = await addThunk(name, 'Uncategorized')
            }
            alternativesWithId.push({ 
              ...alternative, 
              itemId: ingredientItemId 
            });
          }
        }
      }

      ingredientsWithId.push({ 
        ...ingredient, 
        itemId: ingredientItemId, 
        alternatives: alternativesWithId 
      });
    }
  }
  return ingredientsWithId;
}

export default sanitizeIngredients;