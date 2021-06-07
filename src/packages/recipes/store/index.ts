import { createSlice } from '@reduxjs/toolkit';
import checkRecipeHasItem from '@recipes/utils/checkRecipeHasItem';
import { RecipeStore } from '@core/types';
 
const slice = createSlice({
  name: 'recipesStore',
  initialState: {
    recipes: {}
  },
  reducers: {
    getAllRecipesDone: (state: RecipeStore, { payload }) => {
      state.recipes = payload;
    },
    clearRecipes: (state: RecipeStore) => {
      state.recipes = {};
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
            recipe.ingredients = recipe.ingredients.filter((ingredient: any) => ingredient.itemId !== itemId)
          }
        }
      }
    }
  }
});

export const {
  getAllRecipesDone,
  clearRecipes,
  updateRecipe,
  deleteRecipeDone,
  removeIngredient
} = slice.actions;

export default slice.reducer;