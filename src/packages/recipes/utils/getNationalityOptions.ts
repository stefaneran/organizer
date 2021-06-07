export default (recipes) => {
  const nationalities = [];
  Object.keys(recipes).forEach(recipeId => {
    const { nationality } = recipes[recipeId];
    if (!nationalities.includes(nationality)) {
      nationalities.push(nationality);
    }
  })
  return nationalities;
}