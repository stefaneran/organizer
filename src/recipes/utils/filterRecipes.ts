export default (recipes, selectedNationality, selectedCategory, textFilter) => {
  const filtered = {};
  Object.keys(recipes).forEach(recipeId => {
    const recipe = recipes[recipeId];

    const passesNationality = 
      selectedNationality === 'All' || 
      (selectedNationality !== 'All' && recipe.nationality === selectedNationality);

    const passedCategory = 
      selectedCategory === '' ||
      (selectedCategory.length && recipe.category.toLowerCase().includes(selectedCategory.toLowerCase()))

    const passesTextFilter = 
      textFilter === '' ||
      (textFilter.length && recipe.name.toLowerCase().includes(textFilter.toLowerCase()));

    if (passesNationality && passedCategory && passesTextFilter) {
      filtered[recipeId] = recipe;
    }
  })
  return filtered;
}