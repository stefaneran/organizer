import { createSlice } from '@reduxjs/toolkit';
import checkRecipeHasItem from '@recipes/utils/checkRecipeHasItem';

const slice = createSlice({
  name: 'recipesStore',
  initialState: {
    recipes: {}
  },
  reducers: {
    getAllRecipesDone: (state, { payload }) => {
      state.recipes = payload;
    },
    clearRecipes: state => {
      state.recipes = {};
    },
    updateRecipe: (state, { payload }) => {
      const { recipeId, recipe } = payload;
      state.recipes[recipeId] = recipe;
    },
    removeRecipeDone: (state, { payload }) => {
      const { recipeId } = payload;
      delete state.recipes[recipeId];
    },
    removeIngredient: (state, { payload }) => {
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
  removeRecipeDone,
  removeIngredient
} = slice.actions;

export default slice.reducer;