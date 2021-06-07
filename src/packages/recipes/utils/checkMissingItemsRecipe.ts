// Checks missing ingredients for whole recipe
export default (recipe, availableItems) => {
  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const { itemId } = recipe.ingredients[i];
    if (!availableItems.includes(itemId)) {
      return true;
    }
  }
  return false;
}