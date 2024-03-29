import { createSlice } from '@reduxjs/toolkit';
import checkRecipeHasItem from 'recipes/utils/checkRecipeHasItem';
import { Ingredient, IngredientChange } from 'recipes/types';
import { Recipe } from 'recipes/types';

interface RecipeStore {
  recipes: Record<string, Recipe>;
  lastUpdate: number;
}
 
const slice = createSlice({
  name: 'recipesStore',
  initialState: {
    recipes: {},
    // Last time there was an update in recipes
    lastUpdate: 0
  } as RecipeStore,
  reducers: {
    setRecipes: (state: RecipeStore, { payload }) => {
      state.recipes = payload;
    },
    clearRecipes: (state: RecipeStore) => {
      state.recipes = {};
      state.lastUpdate = 0;
    },
    updateRecipe: (state: RecipeStore, { payload }) => {
      const { recipeId, recipe } = payload;
      state.recipes[recipeId] = recipe;
    },
    deleteRecipeDone: (state: RecipeStore, { payload }) => {
      const { recipeId } = payload;
      delete state.recipes[recipeId];
    },
    removeIngredient: (state: RecipeStore, { payload }) => {
      for(const itemId of payload) {
        for (const recipeId of Object.keys(state.recipes)) {
          const recipe = state.recipes[recipeId];
          const hasitem = checkRecipeHasItem(recipe, itemId);
          if (hasitem) {
            recipe.ingredients = recipe.ingredients.filter((ingredient: Ingredient) => ingredient.itemId !== itemId)
          }
        }
      }
    },
    // Dispatched after an item in inventory gets permanently deleted (we remove it from recipes' ingredients)
    updateAfterItemDelete: (state: RecipeStore, { payload }) => {
      const { hasChanges, changes } = payload;
      if (hasChanges) {
        changes.forEach((change: IngredientChange) => {
          const { recipeId, itemId, updatedIngredient } = change;
          const recipe = state.recipes[recipeId];
          // If no ingredient property, needs to be deleted
          if (!updatedIngredient) {
            recipe.ingredients = recipe.ingredients.filter((ingredient: Ingredient) => ingredient.itemId !== itemId)
          }
          // Otherwise replaceaffected ingredients with updated version
          else {
            recipe.ingredients = recipe.ingredients.map((oldIngredient: Ingredient) => {
              return oldIngredient.itemId === itemId ? updatedIngredient : oldIngredient
            })
          }
        })
      }
    },
    setLastRecipeUpdate: (state: RecipeStore, { payload }) => {
      state.lastUpdate = Number(payload);
    }
  }
});

export const {
  setRecipes,
  clearRecipes,
  updateRecipe,
  deleteRecipeDone,
  removeIngredient,
  updateAfterItemDelete,
  setLastRecipeUpdate
} = slice.actions;

export default slice.reducer;