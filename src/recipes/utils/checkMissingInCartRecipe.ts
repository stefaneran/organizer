// This returns false if even one missing item is not present in cart - Otherwise returns true always
// Note: We don't really care about this function's return value unless checkMissingItems returns true
export default (recipe, availableItems, cart) => {
  for (let i = 0; i < recipe.ingredients.length; i += 1) {
    const { itemId } = recipe.ingredients[i];
    if (!availableItems.includes(itemId) && !cart.includes(itemId)) {
      return false;
    }
  }
  return true;
}