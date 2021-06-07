export default (recipe: any, itemId: string) => {
  for (const ingredient of recipe.ingredients) {
    if (ingredient.itemId === itemId) {
      return true;
    }
  }
  return false;
}