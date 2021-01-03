import * as React from 'react';
import RecipeItem from '@recipes/components/RecipeItem';
import ItemTag from '@recipes/components/ItemTag';
import filterRecipes from '@recipes/utils/filterRecipes';

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
            isMobile
          />
        }
      />
    ))}
    </>
  )
}

export default RecipesList;