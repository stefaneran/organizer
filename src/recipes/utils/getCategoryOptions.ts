export default (recipes): string[] => {
  const categories = [];
  Object.keys(recipes).map(recipeId => {
    const { category } = recipes[recipeId];
    if (!categories.includes(category)) {
      categories.push(category);
    }
  })
  return categories;
}