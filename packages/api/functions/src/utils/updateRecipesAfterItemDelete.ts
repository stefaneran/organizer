const updateRecipesAfterItemDelete = (
  userRecipes: Record<string, any>, 
  itemIds: string[]
) => {
  // Serves as a flag to trigger update of recipes on the front end (if no ingredient was removed, will remain false)
  let hasChanges = false;
  const changes = [];
  const recipes = { ...userRecipes };
  // Go through recipes
  for (const recipeId of Object.keys(recipes)) {
    const ingredients = recipes[recipeId].ingredients;
    const updatedIngredients = [];
    // Go through ingredients
    for (const ingredient of ingredients) {
      const { itemId, alternatives } = ingredient;
      const shouldRemove = itemIds.includes(itemId);
      const hasAlternatives = alternatives.length;
      // If ingredient should be removed, but has alternatives
      if (shouldRemove && hasAlternatives) {
        // Then Check for first viable alternative
        for (const alternative of ingredient.alternatives) {
          if (!itemIds.includes(alternative.itemId)) {
            // Then replace the parent with the alternative
            const newIngredient = {
              ...alternative,
              isOptional: ingredient.isOptional,
              alternatives: ingredient.alternatives.filter((alt: any) =>
                !itemIds.includes(alt.itemId) && alt.itemId !== alternative.itemId
              )
            }
            hasChanges = true;
            changes.push({ recipeId, itemId, updatedIngredient: newIngredient });
            updatedIngredients.push(newIngredient);
            break;
          }
        }
      }
      // If ingredient shouldn't be removed, but has alternative(s)
      else if (!shouldRemove && hasAlternatives) {
        // Then filter out the alternative(s) of any that might need to be removed
        const updatedIngredient = {
          ...ingredient,
          alternatives: ingredient.alternatives.filter((alt: any) => !itemIds.includes(alt.itemId))
        }
        // If alternatives have different sizes, means some were filtered out
        if (ingredient.alternatives.length !== updatedIngredient.alternatives.length) {
          hasChanges = true;
          changes.push({ recipeId, itemId, updatedIngredient });
        }
        updatedIngredients.push(updatedIngredient);
      }
      // Otherwise, just push the ingredient
      else if (!shouldRemove) {
        updatedIngredients.push(ingredient);
      }
      else {
        // Push only the itemId as a flag to delete this
        changes.push({ recipeId, itemId });
      }
    }
    // If ingredients are different sizes, means some were filtered out
    if (ingredients.length !== updatedIngredients.length) {
      hasChanges = true;
    }
    recipes[recipeId].ingredients = updatedIngredients;
  }
  return { recipes, hasChanges, changes }
}

export default updateRecipesAfterItemDelete;