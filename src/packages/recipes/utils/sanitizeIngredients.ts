import getIngredientIdByName from '@recipes/utils/getIngredientIdByName';

// Maps all ingredients with itemIds - Whether they're existing items or new items that need new ids to be created
// We do this because ingredients in edit mode don't have ids by default
const sanitizeIngredients = async (ingredients, allItems, dispatch, addToAllItems) => {
  const ingredientsWithId = [];
  // Verify each ingredient and get its existing/newly created itemId
  for await (const ingredient of ingredients) {
    const { name, alternatives } = ingredient;
    const alternativesWithId = [];
    if (name.length) {

      // Look up item's ID
      let ingredientItemId = getIngredientIdByName(name, allItems);
      // If no ID exists, create the new item and assign it an ID
      if (!ingredientItemId) {
        ingredientItemId = await dispatch(addToAllItems({ name, category: 'Uncategorized' }))
      }

      // Do the same verification for an ingredient's alternatives
      for await (const alternative of alternatives) {
        const { name } = alternative;
        if (name.length) {

          // Look up item's ID by name
          let ingredientItemId = getIngredientIdByName(name, allItems);
          // If no ID exists, create the new item and assign it an ID
          if (!ingredientItemId) {
            ingredientItemId = await dispatch(addToAllItems({ name, category: 'Uncategorized' }))
          }
          alternativesWithId.push({ 
            ...alternative, 
            itemId: ingredientItemId 
          });
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