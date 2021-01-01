import * as React from 'react';
import RecipeItem from '@recipes/components/RecipeItem';
import ItemTag from '@recipes/components/ItemTag';

const filterRecipes = (recipes, selectedNationality, selectedCategory, textFilter) => {
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

const RecipesList = ({ 
  recipes, 
  selectedNationality,
  selectedCategory,
  selectedRecipe, 
  onSelectRecipe, 
  textFilter,
  availableItems,
  cart,
  addToCart
}) => {
  
  const filteredRecipes = filterRecipes(recipes, selectedNationality, selectedCategory, textFilter);

  return (
    <>
      {Object.keys(filteredRecipes).map(recipeId => (
        <RecipeItem
          key={recipeId}
          recipeId={recipeId}
          recipe={recipes[recipeId]}
          selectedRecipe={selectedRecipe}
          onSelectRecipe={onSelectRecipe}
          availableItems={availableItems}
          cart={cart}
          addToCart={addToCart}
          tag={
            <ItemTag 
              recipe={recipes[recipeId]} 
              availableItems={availableItems} 
              cart={cart} 
            />
          }
        />
      ))}
    </>
  )
}

export default RecipesList;